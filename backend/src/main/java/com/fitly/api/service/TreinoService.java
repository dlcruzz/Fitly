package com.fitly.api.service;

import com.fitly.api.dto.ExercicioDTO;
import com.fitly.api.dto.TreinoDTO;
import com.fitly.api.model.Exercicio;
import com.fitly.api.model.Treino;
import com.fitly.api.model.Usuario;
import com.fitly.api.repository.TreinoRepository;
import com.fitly.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TreinoService {

    private final TreinoRepository treinoRepository;
    private final UsuarioRepository usuarioRepository;

    // readOnly = true → otimização: Hibernate não rastreia mudanças nessa transação
    @Transactional(readOnly = true)
    public List<TreinoDTO> listarTreinos(String email) {
        Usuario usuario = getUsuario(email);
        return treinoRepository.findByUsuarioIdAndAtivoTrue(usuario.getId())
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public TreinoDTO buscarPorId(Long idTreino, String email) {
        Usuario usuario = getUsuario(email);
        Treino treino = treinoRepository.findByIdAndUsuarioId(idTreino, usuario.getId())
                .orElseThrow(() -> new RuntimeException("Treino não encontrado"));
        return toDTO(treino);
    }

    @Transactional
    public TreinoDTO criar(TreinoDTO dto, String email) {
        Usuario usuario = getUsuario(email);

        Treino treino = Treino.builder()
                .usuario(usuario)
                .nome(dto.getNome())
                .descricao(dto.getDescricao())
                .diasSemana(dto.getDiasSemana())
                .build();

        // Cria os exercícios junto com o treino via cascade
        if (dto.getExercicios() != null && !dto.getExercicios().isEmpty()) {
            List<Exercicio> exercicios = new ArrayList<>();
            for (int i = 0; i < dto.getExercicios().size(); i++) {
                ExercicioDTO eDto = dto.getExercicios().get(i);
                exercicios.add(Exercicio.builder()
                        .treino(treino)
                        .nome(eDto.getNome())
                        .grupoMuscular(eDto.getGrupoMuscular())
                        .descricao(eDto.getDescricao())
                        .equipamento(eDto.getEquipamento())
                        .seriesPadrao(eDto.getSeriesPadrao())
                        .repeticoesPadrao(eDto.getRepeticoesPadrao())
                        .cargaInicialKg(eDto.getCargaInicialKg())
                        .ordem(i + 1)
                        .build());
            }
            treino.setExercicios(exercicios);
        }

        return toDTO(treinoRepository.save(treino));
    }

    @Transactional
    public TreinoDTO atualizar(Long idTreino, TreinoDTO dto, String email) {
        Usuario usuario = getUsuario(email);
        Treino treino = treinoRepository.findByIdAndUsuarioId(idTreino, usuario.getId())
                .orElseThrow(() -> new RuntimeException("Treino não encontrado"));

        treino.setNome(dto.getNome());
        if (dto.getDescricao() != null) treino.setDescricao(dto.getDescricao());
        if (dto.getDiasSemana() != null) treino.setDiasSemana(dto.getDiasSemana());

        return toDTO(treinoRepository.save(treino));
    }

    @Transactional
    public void excluir(Long idTreino, String email) {
        Usuario usuario = getUsuario(email);
        Treino treino = treinoRepository.findByIdAndUsuarioId(idTreino, usuario.getId())
                .orElseThrow(() -> new RuntimeException("Treino não encontrado"));
        // Soft delete — mantém o histórico intacto
        treino.setAtivo(false);
        treinoRepository.save(treino);
    }

    private Usuario getUsuario(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    private TreinoDTO toDTO(Treino treino) {
        return TreinoDTO.builder()
                .id(treino.getId())
                .nome(treino.getNome())
                .descricao(treino.getDescricao())
                .diasSemana(treino.getDiasSemana())
                .dataCriacao(treino.getDataCriacao())
                .ativo(treino.getAtivo())
                .exercicios(treino.getExercicios() != null
                        ? treino.getExercicios().stream().map(this::toExercicioDTO).toList()
                        : List.of())
                .build();
    }

    private ExercicioDTO toExercicioDTO(Exercicio e) {
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
