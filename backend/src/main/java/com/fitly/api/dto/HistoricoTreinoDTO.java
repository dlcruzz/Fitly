package com.fitly.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoTreinoDTO {
    private Long id;
    private Long idTreino;
    private String nomeTreino;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
    private Integer duracaoMinutos;
    private Double volumeTotalKg;
    private String observacoes;
}
