package com.fitly.api.service;

import com.fitly.api.dto.ExercicioDTO;
import com.fitly.api.repository.ExercicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExercicioService {

    private final ExercicioRepository exercicioRepository;

    public List<ExercicioDTO> listarExercicios(String nome, String grupoMuscular) {
        // TODO: aplicar filtros opcionais (nome, grupoMuscular)
        // TODO: converter entidades para DTOs
        // TODO: retornar lista ordenada por grupo muscular e nome
        throw new UnsupportedOperationException("Método listarExercicios ainda não implementado");
    }

    public ExercicioDTO criar(ExercicioDTO dto, Long idTreino) {
        // TODO: validar existência do treino
        // TODO: criar entidade e associar ao treino
        // TODO: definir ordem automaticamente (último da lista)
        // TODO: salvar e retornar DTO
        throw new UnsupportedOperationException("Método criar ainda não implementado");
    }

    public ExercicioDTO atualizar(Long idExercicio, ExercicioDTO dto) {
        // TODO: buscar exercício pelo ID
        // TODO: atualizar campos permitidos
        // TODO: salvar e retornar DTO atualizado
        throw new UnsupportedOperationException("Método atualizar ainda não implementado");
    }

    public void excluir(Long idExercicio) {
        // TODO: verificar se exercício existe
        // TODO: remover exercício (hard delete — reordenar os demais)
        throw new UnsupportedOperationException("Método excluir ainda não implementado");
    }
}
