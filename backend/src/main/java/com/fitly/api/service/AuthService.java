package com.fitly.api.service;

import com.fitly.api.dto.LoginRequestDTO;
import com.fitly.api.dto.LoginResponseDTO;
import com.fitly.api.dto.RegisterRequestDTO;
import com.fitly.api.model.Usuario;
import com.fitly.api.repository.UsuarioRepository;
import com.fitly.api.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public LoginResponseDTO login(LoginRequestDTO request) {
        // TODO: autenticar usuário via authenticationManager
        // TODO: gerar token JWT via jwtUtil.gerarToken()
        // TODO: gerar refresh token
        // TODO: retornar LoginResponseDTO com token, nome e email do usuário
        throw new UnsupportedOperationException("Método login ainda não implementado");
    }

    public LoginResponseDTO register(RegisterRequestDTO request) {
        // TODO: verificar se e-mail já está cadastrado
        // TODO: validar se senhas coincidem
        // TODO: criar novo Usuario com senha criptografada
        // TODO: salvar usuário no banco
        // TODO: fazer login automático e retornar token
        throw new UnsupportedOperationException("Método register ainda não implementado");
    }

    public LoginResponseDTO refreshToken(String refreshToken) {
        // TODO: validar refresh token via jwtUtil.validarToken()
        // TODO: extrair e-mail do token
        // TODO: gerar novo token de acesso
        // TODO: retornar novo LoginResponseDTO
        throw new UnsupportedOperationException("Método refreshToken ainda não implementado");
    }
}
