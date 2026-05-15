package com.fitly.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MetaDTO {

    private Long id;

    @NotBlank(message = "O título da meta é obrigatório")
    private String titulo;

    private String descricao;

    @NotBlank(message = "O tipo da meta é obrigatório")
    private String tipo;

    @NotNull(message = "O valor alvo é obrigatório")
    @Positive(message = "O valor alvo deve ser positivo")
    private Double valorAlvo;

    private Double valorAtual;

    private LocalDate dataLimite;

    private LocalDateTime dataCriacao;

    private LocalDateTime dataConclusao;

    private String status;

    // Percentual calculado: (valorAtual / valorAlvo) * 100
    private Double percentualConcluido;
}
