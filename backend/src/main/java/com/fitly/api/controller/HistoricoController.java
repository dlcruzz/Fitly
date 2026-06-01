package com.fitly.api.controller;

import com.fitly.api.dto.HistoricoTreinoDTO;
import com.fitly.api.dto.SessaoRequestDTO;
import com.fitly.api.service.HistoricoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/historico")
@RequiredArgsConstructor
public class HistoricoController {

    private final HistoricoService historicoService;

    @GetMapping
    public ResponseEntity<Page<HistoricoTreinoDTO>> listar(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanhoPagina) {
        PageRequest pageRequest = PageRequest.of(pagina, tamanhoPagina, Sort.by("dataInicio").descending());
        return ResponseEntity.ok(historicoService.listarHistorico(userDetails.getUsername(), pageRequest));
    }

    @PostMapping
    public ResponseEntity<HistoricoTreinoDTO> registrar(
            @Valid @RequestBody SessaoRequestDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(historicoService.registrarSessao(userDetails.getUsername(), dto));
    }

    @GetMapping("/evolucao")
    public ResponseEntity<List<Map<String, Object>>> evolucao(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam Long exercicioId,
            @RequestParam(defaultValue = "30D") String periodo) {
        return ResponseEntity.ok(
                historicoService.getEvolucaoCarga(userDetails.getUsername(), exercicioId, periodo));
    }

    @GetMapping("/resumo-semana")
    public ResponseEntity<Map<String, Object>> resumoSemana(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(historicoService.getResumoSemana(userDetails.getUsername()));
    }
}
