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

    // GET /exercicios — listar exercícios com filtros opcionais
    @GetMapping
    public ResponseEntity<List<ExercicioDTO>> listar(
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String grupoMuscular) {
        // TODO: delegar para exercicioService.listarExercicios(nome, grupoMuscular)
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // POST /exercicios — criar exercício associado a um treino
    @PostMapping
    public ResponseEntity<ExercicioDTO> criar(
            @Valid @RequestBody ExercicioDTO dto,
            @RequestParam Long idTreino) {
        // TODO: delegar para exercicioService.criar(dto, idTreino)
        // TODO: retornar 201 CREATED
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // PUT /exercicios/{id} — atualizar exercício existente
    @PutMapping("/{id}")
    public ResponseEntity<ExercicioDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody ExercicioDTO dto) {
        // TODO: delegar para exercicioService.atualizar(id, dto)
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // DELETE /exercicios/{id} — remover exercício
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        // TODO: delegar para exercicioService.excluir(id)
        // TODO: retornar 204 NO CONTENT
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
}
