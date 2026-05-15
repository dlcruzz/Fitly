package com.fitly.api.controller;

import com.fitly.api.dto.LoginRequestDTO;
import com.fitly.api.dto.LoginResponseDTO;
import com.fitly.api.dto.RegisterRequestDTO;
import com.fitly.api.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // POST /auth/login — autenticar usuário e retornar token JWT
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO request) {
        // TODO: delegar para authService.login(request)
        // TODO: retornar 200 OK com o token no corpo da resposta
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // POST /auth/register — cadastrar novo usuário
    @PostMapping("/register")
    public ResponseEntity<LoginResponseDTO> register(@Valid @RequestBody RegisterRequestDTO request) {
        // TODO: delegar para authService.register(request)
        // TODO: retornar 201 CREATED com o token no corpo da resposta
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // POST /auth/refresh — renovar token JWT usando o refresh token
    @PostMapping("/refresh")
    public ResponseEntity<LoginResponseDTO> refresh(@RequestHeader("X-Refresh-Token") String refreshToken) {
        // TODO: delegar para authService.refreshToken(refreshToken)
        // TODO: retornar 200 OK com o novo token
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }
}
