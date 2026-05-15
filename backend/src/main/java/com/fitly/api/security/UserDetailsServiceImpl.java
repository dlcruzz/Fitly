package com.fitly.api.security;

import com.fitly.api.model.Usuario;
import com.fitly.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // TODO: buscar usuário pelo email via usuarioRepository.findByEmail(email)
        // TODO: lançar UsernameNotFoundException se não encontrado
        // TODO: retornar User.builder()
        //         .username(usuario.getEmail())
        //         .password(usuario.getSenha())
        //         .roles("USER")
        //         .build()
        throw new UsernameNotFoundException("Implementação pendente — usuário: " + email);
    }
}
