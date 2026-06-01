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
        // Delega a verificação de email+senha pro Spring Security
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getSenha()));

        Usuario usuario = usuarioRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return buildResponse(usuario);
    }

    public LoginResponseDTO register(RegisterRequestDTO request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("E-mail já cadastrado");
        }

        if (!request.getSenha().equals(request.getConfirmacaoSenha())) {
            throw new RuntimeException("As senhas não coincidem");
        }

        // Salva o usuário com a senha criptografada — NUNCA salvar senha em texto puro
        Usuario usuario = Usuario.builder()
                .nome(request.getNome())
                .email(request.getEmail())
                .senha(passwordEncoder.encode(request.getSenha()))
                .build();

        usuarioRepository.save(usuario);
        return buildResponse(usuario);
    }

    public LoginResponseDTO refreshToken(String refreshToken) {
        if (!jwtUtil.validarToken(refreshToken)) {
            throw new RuntimeException("Refresh token inválido ou expirado");
        }

        String email = jwtUtil.extrairEmail(refreshToken);
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return buildResponse(usuario);
    }

    // Centraliza a montagem do response para evitar repetição em login, register e refresh
    private LoginResponseDTO buildResponse(Usuario usuario) {
        return LoginResponseDTO.builder()
                .token(jwtUtil.gerarToken(usuario.getEmail()))
                .refreshToken(jwtUtil.gerarRefreshToken(usuario.getEmail()))
                .tipo("Bearer")
                .idUsuario(usuario.getId())
                .nome(usuario.getNome())
                .email(usuario.getEmail())
                .expiracaoMs(86400000L)
                .build();
    }
}
