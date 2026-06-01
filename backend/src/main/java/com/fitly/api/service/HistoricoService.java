package com.fitly.api.service;

import com.fitly.api.dto.HistoricoTreinoDTO;
import com.fitly.api.dto.SessaoRequestDTO;
import com.fitly.api.model.Exercicio;
import com.fitly.api.model.HistoricoCarga;
import com.fitly.api.model.HistoricoTreino;
import com.fitly.api.model.Treino;
import com.fitly.api.model.Usuario;
import com.fitly.api.repository.ExercicioRepository;
import com.fitly.api.repository.HistoricoCargaRepository;
import com.fitly.api.repository.HistoricoTreinoRepository;
import com.fitly.api.repository.TreinoRepository;
import com.fitly.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HistoricoService {

    private final HistoricoTreinoRepository historicoTreinoRepository;
    private final HistoricoCargaRepository historicoCargaRepository;
    private final TreinoRepository treinoRepository;
    private final ExercicioRepository exercicioRepository;
    private final UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public Page<HistoricoTreinoDTO> listarHistorico(String email, Pageable pageable) {
        Usuario usuario = getUsuario(email);
        return historicoTreinoRepository
                .findByUsuarioIdOrderByDataInicioDesc(usuario.getId(), pageable)
                .map(this::toDTO);
    }

    @Transactional
    public HistoricoTreinoDTO registrarSessao(String email, SessaoRequestDTO dto) {
        Usuario usuario = getUsuario(email);
        Treino treino = treinoRepository.findById(dto.getIdTreino())
                .orElseThrow(() -> new RuntimeException("Treino não encontrado"));

        long duracaoMinutos = Duration.between(dto.getDataInicio(), dto.getDataFim()).toMinutes();

        double volumeTotal = 0.0;
        if (dto.getSeries() != null) {
            for (var serie : dto.getSeries()) {
                volumeTotal += serie.getRepeticoesRealizadas() * serie.getCargaKg();
            }
        }

        HistoricoTreino historico = HistoricoTreino.builder()
                .usuario(usuario)
                .treino(treino)
                .dataInicio(dto.getDataInicio())
                .dataFim(dto.getDataFim())
                .duracaoMinutos((int) duracaoMinutos)
                .volumeTotalKg(volumeTotal)
                .observacoes(dto.getObservacoes())
                .build();

        HistoricoTreino salvo = historicoTreinoRepository.save(historico);

        if (dto.getSeries() != null) {
            List<HistoricoCarga> cargas = new ArrayList<>();
            for (var serie : dto.getSeries()) {
                Exercicio exercicio = exercicioRepository.findById(serie.getIdExercicio())
                        .orElseThrow(() -> new RuntimeException("Exercício não encontrado: " + serie.getIdExercicio()));

                cargas.add(HistoricoCarga.builder()
                        .historicoTreino(salvo)
                        .exercicio(exercicio)
                        .numeroSerie(serie.getNumeroSerie())
                        .repeticoesRealizadas(serie.getRepeticoesRealizadas())
                        .cargaKg(serie.getCargaKg())
                        .build());
            }
            historicoCargaRepository.saveAll(cargas);
        }

        return toDTO(salvo);
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> getEvolucaoCarga(String email, Long idExercicio, String periodo) {
        Usuario usuario = getUsuario(email);
        LocalDateTime dataInicio = resolverPeriodo(periodo);

        List<HistoricoCarga> cargas = historicoCargaRepository
                .findEvolucaoCarga(usuario.getId(), idExercicio, dataInicio);

        // Agrupa por data e retorna a carga máxima de cada dia
        Map<LocalDate, Double> maxPorDia = new LinkedHashMap<>();
        for (HistoricoCarga hc : cargas) {
            LocalDate dia = hc.getDataRegistro().toLocalDate();
            maxPorDia.merge(dia, hc.getCargaKg(), Math::max);
        }

        List<Map<String, Object>> resultado = new ArrayList<>();
        maxPorDia.forEach((data, carga) -> {
            Map<String, Object> ponto = new LinkedHashMap<>();
            ponto.put("data", data.toString());
            ponto.put("cargaMaxKg", carga);
            resultado.add(ponto);
        });

        return resultado;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getResumoSemana(String email) {
        Usuario usuario = getUsuario(email);

        LocalDateTime inicioDaSemana = LocalDate.now()
                .with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY))
                .atStartOfDay();
        LocalDateTime fimDaSemana = inicioDaSemana.plusDays(6).withHour(23).withMinute(59).withSecond(59);

        Long sessoesRealizadas = historicoTreinoRepository
                .contarSessoesPeriodo(usuario.getId(), inicioDaSemana, fimDaSemana);

        List<HistoricoTreino> sessoesNaSemana = historicoTreinoRepository
                .findByUsuarioIdAndDataInicioBetween(usuario.getId(), inicioDaSemana, fimDaSemana);

        double volumeTotal = sessoesNaSemana.stream()
                .mapToDouble(h -> h.getVolumeTotalKg() != null ? h.getVolumeTotalKg() : 0.0)
                .sum();

        Integer frequenciaAlvo = usuario.getFrequenciaSemanAlvo();
        double percentualFrequencia = (frequenciaAlvo != null && frequenciaAlvo > 0)
                ? Math.min((sessoesRealizadas / (double) frequenciaAlvo) * 100, 100.0)
                : 0.0;

        Map<String, Object> resumo = new LinkedHashMap<>();
        resumo.put("sessoesRealizadas", sessoesRealizadas);
        resumo.put("frequenciaAlvo", frequenciaAlvo);
        resumo.put("percentualFrequencia", percentualFrequencia);
        resumo.put("volumeTotalKg", volumeTotal);
        resumo.put("inicioDaSemana", inicioDaSemana.toLocalDate().toString());
        resumo.put("fimDaSemana", fimDaSemana.toLocalDate().toString());

        return resumo;
    }

    private LocalDateTime resolverPeriodo(String periodo) {
        return switch (periodo != null ? periodo.toUpperCase() : "30D") {
            case "7D"  -> LocalDateTime.now().minusDays(7);
            case "90D" -> LocalDateTime.now().minusDays(90);
            case "6M"  -> LocalDateTime.now().minusMonths(6);
            case "1A"  -> LocalDateTime.now().minusYears(1);
            default    -> LocalDateTime.now().minusDays(30);
        };
    }

    private Usuario getUsuario(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    private HistoricoTreinoDTO toDTO(HistoricoTreino h) {
        return HistoricoTreinoDTO.builder()
                .id(h.getId())
                .idTreino(h.getTreino().getId())
                .nomeTreino(h.getTreino().getNome())
                .dataInicio(h.getDataInicio())
                .dataFim(h.getDataFim())
                .duracaoMinutos(h.getDuracaoMinutos())
                .volumeTotalKg(h.getVolumeTotalKg())
                .observacoes(h.getObservacoes())
                .build();
    }
}
