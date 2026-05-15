package com.fitly.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "TB_HISTORICO_CARGA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoricoCarga {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_historico_carga")
    @SequenceGenerator(name = "seq_historico_carga", sequenceName = "SEQ_HISTORICO_CARGA", allocationSize = 1)
    @Column(name = "ID_HISTORICO_CARGA")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_HISTORICO_TREINO", nullable = false)
    private HistoricoTreino historicoTreino;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_EXERCICIO", nullable = false)
    private Exercicio exercicio;

    @Column(name = "NUMERO_SERIE", nullable = false)
    private Integer numeroSerie;

    @Column(name = "REPETICOES_REALIZADAS", nullable = false)
    private Integer repeticoesRealizadas;

    @Column(name = "CARGA_KG", nullable = false)
    private Double cargaKg;

    @Column(name = "DATA_REGISTRO", nullable = false)
    private LocalDateTime dataRegistro;

    @PrePersist
    protected void prePersist() {
        this.dataRegistro = LocalDateTime.now();
    }
}
