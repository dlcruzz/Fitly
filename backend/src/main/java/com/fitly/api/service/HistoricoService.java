package com.fitly.api.service;

import com.fitly.api.model.HistoricoTreino;
import com.fitly.api.repository.HistoricoTreinoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class HistoricoService {

    private final HistoricoTreinoRepository historicoTreinoRepository;

    public Page<HistoricoTreino> listarHistorico(Long idUsuario, Pageable pageable) {
        // TODO: buscar histórico paginado do usuário
        // TODO: ordenar por data decrescente
        // TODO: converter para DTO com resumo de cada sessão
        throw new UnsupportedOperationException("Método listarHistorico ainda não implementado");
    }

    public HistoricoTreino registrarSessao(Long idUsuario, Long idTreino, Object dadosSessao) {
        // TODO: validar que o treino pertence ao usuário
        // TODO: criar HistoricoTreino com dataInicio e dataFim
        // TODO: criar HistoricoCarga para cada série realizada
        // TODO: calcular e salvar duracaoMinutos e volumeTotalKg
        // TODO: retornar sessão registrada
        throw new UnsupportedOperationException("Método registrarSessao ainda não implementado");
    }

    public List<Map<String, Object>> getEvolucaoCarga(Long idUsuario, Long idExercicio, String periodo) {
        // TODO: calcular data de início do período (7d, 30d, 3m)
        // TODO: buscar todos os HistoricoCarga do exercício no período
        // TODO: agrupar por data e retornar cargaMaxima e volumeTotal por dia
        throw new UnsupportedOperationException("Método getEvolucaoCarga ainda não implementado");
    }

    public Map<String, Object> getResumoSemana(Long idUsuario) {
        // TODO: contar sessões realizadas na semana atual
        // TODO: somar volume total da semana
        // TODO: calcular frequência (sessões / meta semanal do usuário)
        // TODO: retornar mapa com totalSessoes, volumeTotal, frequencia
        throw new UnsupportedOperationException("Método getResumoSemana ainda não implementado");
    }
}
