package com.fitly.api.controller;

import com.fitly.api.dto.ExercicioDTO;
import com.fitly.api.service.ExercicioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exercicios")
@RequiredArgsConstructor
public class ExercicioController {

    private final ExercicioService exercicioService;

    @GetMapping
    public ResponseEntity<List<ExercicioDTO>> listar(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String grupoMuscular) {
        return ResponseEntity.ok(exercicioService.listarExercicios(nome, grupoMuscular));
    }

    @PostMapping
    public ResponseEntity<ExercicioDTO> criar(
            @Valid @RequestBody ExercicioDTO dto,
            @RequestParam Long idTreino) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(exercicioService.criar(dto, idTreino));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExercicioDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody ExercicioDTO dto) {
        return ResponseEntity.ok(exercicioService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        exercicioService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
