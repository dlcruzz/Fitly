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

    // GET /metas — listar todas as metas do usuário
    @GetMapping
    public ResponseEntity<List<MetaDTO>> listar(@AuthenticationPrincipal UserDetails userDetails) {
        // TODO: extrair ID do usuário do contexto de segurança
        // TODO: delegar para metaService.listarMetas(idUsuario)
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // POST /metas — criar nova meta
    @PostMapping
    public ResponseEntity<MetaDTO> criar(
            @Valid @RequestBody MetaDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        // TODO: delegar para metaService.criar(dto, idUsuario)
        // TODO: retornar 201 CREATED
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // PUT /metas/{id} — atualizar meta existente
    @PutMapping("/{id}")
    public ResponseEntity<MetaDTO> atualizar(
            @PathVariable Long id,
            @Valid @RequestBody MetaDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        // TODO: delegar para metaService.atualizar(id, dto, idUsuario)
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // DELETE /metas/{id} — remover meta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        // TODO: delegar para metaService.excluir(id, idUsuario)
        // TODO: retornar 204 NO CONTENT
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // GET /metas/{id}/progresso — consultar progresso de uma meta específica
    @GetMapping("/{id}/progresso")
    public ResponseEntity<MetaDTO> progresso(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        // TODO: delegar para metaService.getProgresso(id, idUsuario)
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
}
