package com.fitly.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "TB_META")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Meta {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_meta")
    @SequenceGenerator(name = "seq_meta", sequenceName = "SEQ_META", allocationSize = 1)
    @Column(name = "ID_META")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;

    @Column(name = "TITULO", nullable = false, length = 150)
    private String titulo;

    @Column(name = "DESCRICAO", length = 500)
    private String descricao;

    // Tipo da meta: PESO_CORPORAL, CARGA_EXERCICIO, FREQUENCIA_SEMANAL
    @Column(name = "TIPO", nullable = false, length = 30)
    private String tipo;

    @Column(name = "VALOR_ALVO", nullable = false)
    private Double valorAlvo;

    @Column(name = "VALOR_ATUAL")
    private Double valorAtual;

    @Column(name = "DATA_LIMITE")
    private LocalDate dataLimite;

    @Column(name = "DATA_CRIACAO", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;

    @Column(name = "DATA_CONCLUSAO")
    private LocalDateTime dataConclusao;

    // Status: ATIVA, CONCLUIDA, CANCELADA
    @Column(name = "STATUS", nullable = false, length = 20)
    private String status;

    @PrePersist
    protected void prePersist() {
        this.dataCriacao = LocalDateTime.now();
        this.status = "ATIVA";
        this.valorAtual = 0.0;
    }
}
