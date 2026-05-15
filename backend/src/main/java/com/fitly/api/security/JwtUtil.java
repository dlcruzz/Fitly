package com.fitly.api.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiracao-ms}")
    private long expiracaoMs;

    @Value("${jwt.refresh-expiracao-ms}")
    private long refreshExpiracaoMs;

    private Key obterChave() {
        // TODO: converter o secret em uma chave HMAC-SHA256
        // Usar Keys.hmacShaKeyFor(secret.getBytes())
        throw new UnsupportedOperationException("Método obterChave ainda não implementado");
    }

    // Gera um token JWT de acesso para o e-mail fornecido
    public String gerarToken(String email) {
        // TODO: construir JWT com subject=email, issuedAt=now, expiration=now+expiracaoMs
        // TODO: assinar com a chave HMAC gerada por obterChave()
        throw new UnsupportedOperationException("Método gerarToken ainda não implementado");
    }

    // Gera um refresh token com validade maior
    public String gerarRefreshToken(String email) {
        // TODO: similar ao gerarToken, mas usando refreshExpiracaoMs
        throw new UnsupportedOperationException("Método gerarRefreshToken ainda não implementado");
    }

    // Extrai o e-mail (subject) do token JWT
    public String extrairEmail(String token) {
        // TODO: fazer parse do token e retornar getSubject()
        throw new UnsupportedOperationException("Método extrairEmail ainda não implementado");
    }

    // Verifica se o token é válido (assinatura correta e não expirado)
    public boolean validarToken(String token) {
        // TODO: tentar fazer parse do token
        // TODO: retornar true se válido, false se expirado ou inválido
        // TODO: capturar JwtException e retornar false sem lançar exceção
        throw new UnsupportedOperationException("Método validarToken ainda não implementado");
    }

    // Verifica se o token está expirado
    public boolean estaExpirado(String token) {
        // TODO: extrair data de expiração e comparar com now()
        throw new UnsupportedOperationException("Método estaExpirado ainda não implementado");
    }
}
