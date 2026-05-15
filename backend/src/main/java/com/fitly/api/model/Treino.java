package com.fitly.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "TB_TREINO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Treino {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_treino")
    @SequenceGenerator(name = "seq_treino", sequenceName = "SEQ_TREINO", allocationSize = 1)
    @Column(name = "ID_TREINO")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    @Column(name = "NOME", nullable = false, length = 100)
    private String nome;

    @Column(name = "DESCRICAO", length = 500)
    private String descricao;

    // Dias da semana separados por vírgula: "SEGUNDA,QUARTA,SEXTA"
    @Column(name = "DIAS_SEMANA", length = 100)
    private String diasSemana;

    @Column(name = "DATA_CRIACAO", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;

    @Column(name = "ATIVO", nullable = false)
    private Boolean ativo;

    @OneToMany(mappedBy = "treino", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Exercicio> exercicios;

    @OneToMany(mappedBy = "treino", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<HistoricoTreino> historicos;

    @PrePersist
    protected void prePersist() {
        this.dataCriacao = LocalDateTime.now();
        this.ativo = true;
    }
}
