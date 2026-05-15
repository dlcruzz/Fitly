package com.fitly.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "TB_EXERCICIO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_exercicio")
    @SequenceGenerator(name = "seq_exercicio", sequenceName = "SEQ_EXERCICIO", allocationSize = 1)
    @Column(name = "ID_EXERCICIO")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_TREINO")
    private Treino treino;

    @Column(name = "NOME", nullable = false, length = 100)
    private String nome;

    @Column(name = "GRUPO_MUSCULAR", length = 50)
    private String grupoMuscular;

    @Column(name = "DESCRICAO", length = 500)
    private String descricao;

    @Column(name = "EQUIPAMENTO", length = 100)
    private String equipamento;

    @Column(name = "SERIES_PADRAO")
    private Integer seriesPadrao;

    @Column(name = "REPETICOES_PADRAO")
    private Integer repeticoesPadrao;

    @Column(name = "CARGA_INICIAL_KG")
    private Double cargaInicialKg;

    // Ordem de exibição dentro do treino
    @Column(name = "ORDEM")
    private Integer ordem;

    @OneToMany(mappedBy = "exercicio", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<HistoricoCarga> historicoCarga;
}
