package com.fitly.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {

    private String token;
    private String refreshToken;
    private String tipo;
    private Long idUsuario;
    private String nome;
    private String email;
    private Long expiracaoMs;
}
