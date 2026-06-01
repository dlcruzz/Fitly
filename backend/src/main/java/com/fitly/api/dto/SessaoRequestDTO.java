package com.fitly.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class SessaoRequestDTO {
    @NotNull private Long idTreino;
    @NotNull private LocalDateTime dataInicio;
    @NotNull private LocalDateTime dataFim;
    private String observacoes;
    private List<SerieRequestDTO> series;
}
