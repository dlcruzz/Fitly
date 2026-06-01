package com.fitly.api.controller;

import com.fitly.api.dto.MetaDTO;
import com.fitly.api.service.MetaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/metas")
@RequiredArgsConstructor
public class MetaController {

    private final MetaService metaService;

    @GetMapping
    public ResponseEntity<List<MetaDTO>> listar(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(metaService.listarMetas(userDetails.getUsername()));
    }

    @PostMapping
    public ResponseEntity<MetaDTO> criar(
            @Valid @RequestBody MetaDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(metaService.criar(dto, userDetails.getUsername()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MetaDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody MetaDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(metaService.atualizar(id, dto, userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        metaService.excluir(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/progresso")
    public ResponseEntity<MetaDTO> progresso(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(metaService.getProgresso(id, userDetails.getUsername()));
    }
}
