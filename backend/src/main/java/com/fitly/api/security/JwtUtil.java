package com.fitly.api.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

// @Component → registra essa classe como um componente gerenciado pelo Spring
// Isso permite injetar JwtUtil em outros lugares com @Autowired ou construtor
@Component
public class JwtUtil {

    // @Value → injeta o valor do application.properties aqui dentro
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiracao-ms}")
    private long expiracaoMs;

    @Value("${jwt.refresh-expiracao-ms}")
    private long refreshExpiracaoMs;

    // Converte o secret (texto) em uma chave criptográfica HMAC-SHA256
    // HMAC-SHA256 é o algoritmo que assina o token — garante que ninguém alterou ele
    private Key obterChave() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Gera o token de acesso — válido por 24h (86400000ms no application.properties)
    // O "subject" do token é o email do usuário — serve como identificador
    public String gerarToken(String email) {
        return Jwts.builder()
                .setSubject(email)                              // quem é o dono do token
                .setIssuedAt(new Date())                        // quando foi criado
                .setExpiration(new Date(System.currentTimeMillis() + expiracaoMs)) // quando expira
                .signWith(obterChave())                         // assina com nossa chave secreta
                .compact();                                     // gera a string final
    }

    // Gera o refresh token — válido por 7 dias (604800000ms)
    // Usado para renovar o token de acesso sem precisar fazer login novamente
    public String gerarRefreshToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshExpiracaoMs))
                .signWith(obterChave())
                .compact();
    }

    // Extrai o email (subject) de dentro do token
    // Jwts.parserBuilder faz o processo inverso: decodifica e valida a assinatura
    public String extrairEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(obterChave())   // usa a mesma chave para verificar a assinatura
                .build()
                .parseClaimsJws(token)         // decodifica o token
                .getBody()
                .getSubject();                 // retorna o email que foi guardado como subject
    }

    // Verifica se o token é válido: assinatura correta + não expirado
    // Retorna false silenciosamente em vez de lançar exceção — evita quebrar o filtro JWT
    public boolean validarToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(obterChave())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            // Token inválido, expirado ou adulterado — retorna false sem estourar
            return false;
        }
    }

    // Verifica especificamente se o token está expirado
    // Útil para diferenciar "token inválido" de "token expirado" no futuro
    public boolean estaExpirado(String token) {
        try {
            Date expiracao = Jwts.parserBuilder()
                    .setSigningKey(obterChave())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration();
            return expiracao.before(new Date()); // true se a data de expiração já passou
        } catch (JwtException e) {
            return true; // se não conseguiu ler o token, considera expirado
        }
    }
}
