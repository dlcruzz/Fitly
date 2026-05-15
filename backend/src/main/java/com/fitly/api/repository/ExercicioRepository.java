package com.fitly.api.repository;

import com.fitly.api.model.Exercicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExercicioRepository extends JpaRepository<Exercicio, Long> {

    List<Exercicio> findByTreinoId(Long idTreino);

    List<Exercicio> findByNomeContainingIgnoreCase(String nome);

    List<Exercicio> findByGrupoMuscular(String grupoMuscular);
}
