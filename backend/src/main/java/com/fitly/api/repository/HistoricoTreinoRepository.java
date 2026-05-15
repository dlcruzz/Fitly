package com.fitly.api.repository;

import com.fitly.api.model.HistoricoTreino;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HistoricoTreinoRepository extends JpaRepository<HistoricoTreino, Long> {

    Page<HistoricoTreino> findByUsuarioIdOrderByDataInicioDesc(Long idUsuario, Pageable pageable);

    List<HistoricoTreino> findByUsuarioIdAndDataInicioBetween(
            Long idUsuario,
            LocalDateTime inicio,
            LocalDateTime fim
    );

    // Conta sessões realizadas pelo usuário em um período (para calcular frequência)
    @Query("SELECT COUNT(h) FROM HistoricoTreino h WHERE h.usuario.id = :idUsuario " +
           "AND h.dataInicio >= :inicio AND h.dataInicio <= :fim")
    Long contarSessoesPeriodo(
            @Param("idUsuario") Long idUsuario,
            @Param("inicio") LocalDateTime inicio,
            @Param("fim") LocalDateTime fim
    );
}
