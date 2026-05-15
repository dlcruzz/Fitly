package com.fitly.api.service;

import com.fitly.api.dto.MetaDTO;
import com.fitly.api.model.Meta;
import com.fitly.api.repository.MetaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MetaService {

    private final MetaRepository metaRepository;

    public List<MetaDTO> listarMetas(Long idUsuario) {
        // TODO: buscar metas do usuário ordenadas por data de criação
        // TODO: calcular percentualConcluido para cada meta
        // TODO: separar metas ativas das concluídas
        // TODO: retornar lista de DTOs
        throw new UnsupportedOperationException("Método listarMetas ainda não implementado");
    }

    public MetaDTO criar(MetaDTO dto, Long idUsuario) {
        // TODO: buscar usuário pelo ID
        // TODO: criar entidade Meta a partir do DTO
        // TODO: salvar e retornar DTO com percentualConcluido = 0
        throw new UnsupportedOperationException("Método criar ainda não implementado");
    }

    public MetaDTO atualizar(Long idMeta, MetaDTO dto, Long idUsuario) {
        // TODO: verificar se meta pertence ao usuário
        // TODO: atualizar campos (titulo, descricao, valorAlvo, dataLimite)
        // TODO: recalcular percentualConcluido
        // TODO: se percentualConcluido >= 100 → setar status CONCLUIDA e dataConclusao
        throw new UnsupportedOperationException("Método atualizar ainda não implementado");
    }

    public void excluir(Long idMeta, Long idUsuario) {
        // TODO: verificar se meta pertence ao usuário
        // TODO: excluir meta do banco
        throw new UnsupportedOperationException("Método excluir ainda não implementado");
    }

    public MetaDTO getProgresso(Long idMeta, Long idUsuario) {
        // TODO: buscar meta pelo ID e usuário
        // TODO: calcular progresso atual baseado no tipo de meta
        // TODO: retornar DTO com valorAtual, valorAlvo e percentualConcluido
        throw new UnsupportedOperationException("Método getProgresso ainda não implementado");
    }
}
