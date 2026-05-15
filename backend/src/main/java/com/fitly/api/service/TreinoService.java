package com.fitly.api.service;

import com.fitly.api.dto.TreinoDTO;
import com.fitly.api.model.Treino;
import com.fitly.api.repository.TreinoRepository;
import com.fitly.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TreinoService {

    private final TreinoRepository treinoRepository;
    private final UsuarioRepository usuarioRepository;

    public List<TreinoDTO> listarTreinos(Long idUsuario) {
        // TODO: buscar treinos ativos do usuário via treinoRepository
        // TODO: converter entidades para DTOs
        // TODO: incluir exercícios de cada treino
        throw new UnsupportedOperationException("Método listarTreinos ainda não implementado");
    }

    public TreinoDTO buscarPorId(Long idTreino, Long idUsuario) {
        // TODO: buscar treino por ID e usuário (verificar propriedade)
        // TODO: lançar NotFoundException se não encontrado
        // TODO: retornar DTO completo com exercícios
        throw new UnsupportedOperationException("Método buscarPorId ainda não implementado");
    }

    public TreinoDTO criar(TreinoDTO dto, Long idUsuario) {
        // TODO: buscar usuário pelo ID
        // TODO: criar entidade Treino a partir do DTO
        // TODO: criar e associar exercícios ao treino
        // TODO: salvar e retornar DTO criado
        throw new UnsupportedOperationException("Método criar ainda não implementado");
    }

    public TreinoDTO atualizar(Long idTreino, TreinoDTO dto, Long idUsuario) {
        // TODO: verificar se treino pertence ao usuário
        // TODO: atualizar campos alterados
        // TODO: sincronizar lista de exercícios
        // TODO: salvar e retornar DTO atualizado
        throw new UnsupportedOperationException("Método atualizar ainda não implementado");
    }

    public void excluir(Long idTreino, Long idUsuario) {
        // TODO: verificar se treino pertence ao usuário
        // TODO: soft delete — setar ativo = false
        throw new UnsupportedOperationException("Método excluir ainda não implementado");
    }
}
