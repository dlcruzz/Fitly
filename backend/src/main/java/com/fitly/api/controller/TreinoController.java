package com.fitly.api.controller;

import com.fitly.api.dto.TreinoDTO;
import com.fitly.api.service.TreinoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/treinos")
@RequiredArgsConstructor
public class TreinoController {

    private final TreinoService treinoService;

    // GET /treinos — listar todos os treinos do usuário autenticado
    @GetMapping
    public ResponseEntity<List<TreinoDTO>> listar(@AuthenticationPrincipal UserDetails userDetails) {
        // TODO: extrair ID do usuário do contexto de segurança
        // TODO: delegar para treinoService.listarTreinos(idUsuario)
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // GET /treinos/{id} — buscar treino específico por ID
    @GetMapping("/{id}")
    public ResponseEntity<TreinoDTO> buscarPorId(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        // TODO: delegar para treinoService.buscarPorId(id, idUsuario)
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // POST /treinos — criar novo treino
    @PostMapping
    public ResponseEntity<TreinoDTO> criar(
            @Valid @RequestBody TreinoDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        // TODO: delegar para treinoService.criar(dto, idUsuario)
        // TODO: retornar 201 CREATED
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // PUT /treinos/{id} — atualizar treino existente
    @PutMapping("/{id}")
    public ResponseEntity<TreinoDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody TreinoDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        // TODO: delegar para treinoService.atualizar(id, dto, idUsuario)
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // DELETE /treinos/{id} — remover treino (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        // TODO: delegar para treinoService.excluir(id, idUsuario)
        // TODO: retornar 204 NO CONTENT
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
}
