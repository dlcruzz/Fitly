package com.fitly.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SerieRequestDTO {
    @NotNull private Long idExercicio;
    @NotNull private Integer numeroSerie;
    @NotNull private Integer repeticoesRealizadas;
    @NotNull private Double cargaKg;
}
