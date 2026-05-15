package com.fitly.api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        // TODO: extrair header Authorization da requisição
        // TODO: verificar se o header começa com "Bearer "
        // TODO: extrair o token removendo o prefixo "Bearer "
        // TODO: validar o token via jwtUtil.validarToken(token)
        // TODO: extrair e-mail do token via jwtUtil.extrairEmail(token)
        // TODO: carregar UserDetails via userDetailsService.loadUserByUsername(email)
        // TODO: criar UsernamePasswordAuthenticationToken com os UserDetails
        // TODO: setar detalhes da requisição no token de autenticação
        // TODO: setar autenticação no SecurityContextHolder
        // TODO: chamar filterChain.doFilter(request, response) sempre ao final

        filterChain.doFilter(request, response);
    }
}
