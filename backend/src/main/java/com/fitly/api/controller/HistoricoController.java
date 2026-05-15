package com.fitly.api.controller;

import com.fitly.api.service.HistoricoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    // GET /historico — listar histórico de sessões do usuário (paginado)
    @GetMapping
    public ResponseEntity<Page<?>> listar(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "10") int tamanhoPagina) {
        // TODO: extrair ID do usuário do contexto de segurança
        // TODO: delegar para historicoService.listarHistorico(idUsuario, pageable)
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // POST /historico — registrar sessão de treino concluída
    @PostMapping
    public ResponseEntity<?> registrar(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Object dadosSessao) {
        // TODO: delegar para historicoService.registrarSessao(idUsuario, dadosSessao)
        // TODO: retornar 201 CREATED com o histórico salvo
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // GET /historico/evolucao — evolução de carga de um exercício no tempo
    @GetMapping("/evolucao")
    public ResponseEntity<List<Map<String, Object>>> evolucao(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam Long exercicioId,
            @RequestParam(defaultValue = "30d") String periodo) {
        // TODO: delegar para historicoService.getEvolucaoCarga(idUsuario, exercicioId, periodo)
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // GET /historico/resumo-semana — resumo de treinos da semana atual
    @GetMapping("/resumo-semana")
    public ResponseEntity<Map<String, Object>> resumoSemana(
            @AuthenticationPrincipal UserDetails userDetails) {
        // TODO: delegar para historicoService.getResumoSemana(idUsuario)
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
}
