package com.fitly.api.service;

import com.fitly.api.dto.MetaDTO;
import com.fitly.api.model.Meta;
import com.fitly.api.model.Usuario;
import com.fitly.api.repository.MetaRepository;
import com.fitly.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MetaService {

    private final MetaRepository metaRepository;
    private final UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public List<MetaDTO> listarMetas(String email) {
        Usuario usuario = getUsuario(email);
        return metaRepository.findByUsuarioIdOrderByDataCriacaoDesc(usuario.getId())
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional
    public MetaDTO criar(MetaDTO dto, String email) {
        Usuario usuario = getUsuario(email);

        Meta meta = Meta.builder()
                .usuario(usuario)
                .titulo(dto.getTitulo())
                .descricao(dto.getDescricao())
                .tipo(dto.getTipo())
                .valorAlvo(dto.getValorAlvo())
                .dataLimite(dto.getDataLimite())
                .build();

        return toDTO(metaRepository.save(meta));
    }

    @Transactional
    public MetaDTO atualizar(Long idMeta, MetaDTO dto, String email) {
        Usuario usuario = getUsuario(email);
        Meta meta = metaRepository.findByIdAndUsuarioId(idMeta, usuario.getId())
                .orElseThrow(() -> new RuntimeException("Meta não encontrada"));

        if (dto.getTitulo() != null) meta.setTitulo(dto.getTitulo());
        if (dto.getDescricao() != null) meta.setDescricao(dto.getDescricao());
        if (dto.getValorAlvo() != null) meta.setValorAlvo(dto.getValorAlvo());
        if (dto.getDataLimite() != null) meta.setDataLimite(dto.getDataLimite());

        if (dto.getValorAtual() != null) {
            meta.setValorAtual(dto.getValorAtual());
            // Conclui automaticamente ao atingir 100% do valor alvo
            if (dto.getValorAtual() >= meta.getValorAlvo()) {
                meta.setStatus("CONCLUIDA");
                meta.setDataConclusao(LocalDateTime.now());
            }
        }

        return toDTO(metaRepository.save(meta));
    }

    @Transactional
    public void excluir(Long idMeta, String email) {
        Usuario usuario = getUsuario(email);
        Meta meta = metaRepository.findByIdAndUsuarioId(idMeta, usuario.getId())
                .orElseThrow(() -> new RuntimeException("Meta não encontrada"));
        metaRepository.delete(meta);
    }

    @Transactional(readOnly = true)
    public MetaDTO getProgresso(Long idMeta, String email) {
        Usuario usuario = getUsuario(email);
        return metaRepository.findByIdAndUsuarioId(idMeta, usuario.getId())
                .map(this::toDTO)
                .orElseThrow(() -> new RuntimeException("Meta não encontrada"));
    }

    private Usuario getUsuario(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    private MetaDTO toDTO(Meta meta) {
        double percentual = meta.getValorAtual() != null && meta.getValorAlvo() > 0
                ? Math.min((meta.getValorAtual() / meta.getValorAlvo()) * 100, 100.0)
                : 0.0;

        return MetaDTO.builder()
                .id(meta.getId())
                .titulo(meta.getTitulo())
                .descricao(meta.getDescricao())
                .tipo(meta.getTipo())
                .valorAlvo(meta.getValorAlvo())
                .valorAtual(meta.getValorAtual())
                .dataLimite(meta.getDataLimite())
                .dataCriacao(meta.getDataCriacao())
                .dataConclusao(meta.getDataConclusao())
                .status(meta.getStatus())
                .percentualConcluido(percentual)
                .build();
    }
}
