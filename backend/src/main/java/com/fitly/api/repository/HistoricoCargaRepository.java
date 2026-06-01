package com.fitly.api.repository;

import com.fitly.api.model.HistoricoCarga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HistoricoCargaRepository extends JpaRepository<HistoricoCarga, Long> {

    // Busca todas as séries de um exercício de um usuário a partir de uma data
    @Query("SELECT hc FROM HistoricoCarga hc " +
           "WHERE hc.exercicio.id = :idExercicio " +
           "AND hc.historicoTreino.usuario.id = :idUsuario " +
           "AND hc.dataRegistro >= :dataInicio " +
           "ORDER BY hc.dataRegistro ASC")
    List<HistoricoCarga> findEvolucaoCarga(
            @Param("idUsuario") Long idUsuario,
            @Param("idExercicio") Long idExercicio,
            @Param("dataInicio") LocalDateTime dataInicio
    );
}
