package com.fitly.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "TB_HISTORICO_TREINO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistoricoTreino {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_historico_treino")
    @SequenceGenerator(name = "seq_historico_treino", sequenceName = "SEQ_HISTORICO_TREINO", allocationSize = 1)
    @Column(name = "ID_HISTORICO")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_TREINO", nullable = false)
    private Treino treino;

    @Column(name = "DATA_INICIO", nullable = false)
    private LocalDateTime dataInicio;

    @Column(name = "DATA_FIM")
    private LocalDateTime dataFim;

    // Duração calculada em minutos
    @Column(name = "DURACAO_MINUTOS")
    private Integer duracaoMinutos;

    // Volume total da sessão em kg (soma de séries × reps × carga)
    @Column(name = "VOLUME_TOTAL_KG")
    private Double volumeTotalKg;

    @Column(name = "OBSERVACOES", length = 500)
    private String observacoes;

    @OneToMany(mappedBy = "historicoTreino", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<HistoricoCarga> seriesRealizadas;
}
