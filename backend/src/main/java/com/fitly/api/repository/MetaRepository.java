package com.fitly.api.repository;

import com.fitly.api.model.Meta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MetaRepository extends JpaRepository<Meta, Long> {

    List<Meta> findByUsuarioIdOrderByDataCriacaoDesc(Long idUsuario);

    List<Meta> findByUsuarioIdAndStatus(Long idUsuario, String status);

    Optional<Meta> findByIdAndUsuarioId(Long id, Long idUsuario);
}
