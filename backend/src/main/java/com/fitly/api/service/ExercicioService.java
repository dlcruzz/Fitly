package com.fitly.api.service;

import com.fitly.api.dto.ExercicioDTO;
import com.fitly.api.model.Exercicio;
import com.fitly.api.model.Treino;
import com.fitly.api.repository.ExercicioRepository;
import com.fitly.api.repository.TreinoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExercicioService {

    private final ExercicioRepository exercicioRepository;
    private final TreinoRepository treinoRepository;

    @Transactional(readOnly = true)
    public List<ExercicioDTO> listarExercicios(String nome, String grupoMuscular) {
        // Filtra em memória — suficiente para um catálogo de tamanho de portfólio
        return exercicioRepository.findAll().stream()
                .filter(e -> nome == null || e.getNome().toLowerCase().contains(nome.toLowerCase()))
                .filter(e -> grupoMuscular == null || (e.getGrupoMuscular() != null
                        && e.getGrupoMuscular().equalsIgnoreCase(grupoMuscular)))
                .map(this::toDTO)
                .toList();
    }

    @Transactional
    public ExercicioDTO criar(ExercicioDTO dto, Long idTreino) {
        Treino treino = treinoRepository.findById(idTreino)
                .orElseThrow(() -> new RuntimeException("Treino não encontrado"));

        // Define a ordem como último da lista automaticamente
        int proxOrdem = exercicioRepository.findByTreinoId(idTreino).size() + 1;

        Exercicio exercicio = Exercicio.builder()
                .treino(treino)
                .nome(dto.getNome())
                .grupoMuscular(dto.getGrupoMuscular())
                .descricao(dto.getDescricao())
                .equipamento(dto.getEquipamento())
                .seriesPadrao(dto.getSeriesPadrao())
                .repeticoesPadrao(dto.getRepeticoesPadrao())
                .cargaInicialKg(dto.getCargaInicialKg())
                .ordem(proxOrdem)
                .build();

        return toDTO(exercicioRepository.save(exercicio));
    }

    @Transactional
    public ExercicioDTO atualizar(Long idExercicio, ExercicioDTO dto) {
        Exercicio exercicio = exercicioRepository.findById(idExercicio)
                .orElseThrow(() -> new RuntimeException("Exercício não encontrado"));

        exercicio.setNome(dto.getNome());
        if (dto.getGrupoMuscular() != null) exercicio.setGrupoMuscular(dto.getGrupoMuscular());
        if (dto.getDescricao() != null) exercicio.setDescricao(dto.getDescricao());
        if (dto.getEquipamento() != null) exercicio.setEquipamento(dto.getEquipamento());
        if (dto.getSeriesPadrao() != null) exercicio.setSeriesPadrao(dto.getSeriesPadrao());
        if (dto.getRepeticoesPadrao() != null) exercicio.setRepeticoesPadrao(dto.getRepeticoesPadrao());
        if (dto.getCargaInicialKg() != null) exercicio.setCargaInicialKg(dto.getCargaInicialKg());

        return toDTO(exercicioRepository.save(exercicio));
    }

    @Transactional
    public void excluir(Long idExercicio) {
        if (!exercicioRepository.existsById(idExercicio)) {
            throw new RuntimeException("Exercício não encontrado");
        }
        exercicioRepository.deleteById(idExercicio);
    }

    private ExercicioDTO toDTO(Exercicio e) {
        return ExercicioDTO.builder()
                .id(e.getId())
                .nome(e.getNome())
                .grupoMuscular(e.getGrupoMuscular())
                .descricao(e.getDescricao())
                .equipamento(e.getEquipamento())
                .seriesPadrao(e.getSeriesPadrao())
                .repeticoesPadrao(e.getRepeticoesPadrao())
                .cargaInicialKg(e.getCargaInicialKg())
                .ordem(e.getOrdem())
                .build();
    }
}
