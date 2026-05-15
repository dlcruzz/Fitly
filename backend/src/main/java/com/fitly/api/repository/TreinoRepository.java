package com.fitly.api.repository;

import com.fitly.api.model.Treino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TreinoRepository extends JpaRepository<Treino, Long> {

    List<Treino> findByUsuarioIdAndAtivoTrue(Long idUsuario);

    Optional<Treino> findByIdAndUsuarioId(Long id, Long idUsuario);
}
