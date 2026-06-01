package com.fitly.api.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

// Captura exceções lançadas pelos services e converte em respostas HTTP adequadas
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Credenciais erradas no login → 401 Unauthorized
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentials(BadCredentialsException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("erro", "Email ou senha incorretos"));
    }

    // Erros de negócio (email duplicado, recurso não encontrado...) → 400 Bad Request
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntime(RuntimeException e) {
        return ResponseEntity.badRequest()
                .body(Map.of("erro", e.getMessage() != null ? e.getMessage() : "Erro desconhecido"));
    }
}
