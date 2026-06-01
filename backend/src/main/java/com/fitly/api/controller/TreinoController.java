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

    @GetMapping
    public ResponseEntity<List<TreinoDTO>> listar(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(treinoService.listarTreinos(userDetails.getUsername()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TreinoDTO> buscarPorId(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(treinoService.buscarPorId(id, userDetails.getUsername()));
    }

    @PostMapping
    public ResponseEntity<TreinoDTO> criar(
            @Valid @RequestBody TreinoDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(treinoService.criar(dto, userDetails.getUsername()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TreinoDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody TreinoDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(treinoService.atualizar(id, dto, userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        treinoService.excluir(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
