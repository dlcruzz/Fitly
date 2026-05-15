package com.fitly.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExercicioDTO {

    private Long id;

    @NotBlank(message = "O nome do exercício é obrigatório")
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres")
    private String nome;

    private String grupoMuscular;

    @Size(max = 500, message = "A descrição deve ter no máximo 500 caracteres")
    private String descricao;

    private String equipamento;

    private Integer seriesPadrao;

    private Integer repeticoesPadrao;

    private Double cargaInicialKg;

    private Integer ordem;
}
