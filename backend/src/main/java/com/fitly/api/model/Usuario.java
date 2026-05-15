package com.fitly.api.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "TB_USUARIO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_usuario")
    @SequenceGenerator(name = "seq_usuario", sequenceName = "SEQ_USUARIO", allocationSize = 1)
    @Column(name = "ID_USUARIO")
    private Long id;

    @Column(name = "NOME", nullable = false, length = 100)
    private String nome;

    @Column(name = "EMAIL", nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "SENHA", nullable = false)
    private String senha;

    @Column(name = "DATA_NASCIMENTO")
    private LocalDate dataNascimento;

    @Column(name = "PESO_KG")
    private Double pesoKg;

    @Column(name = "ALTURA_CM")
    private Integer alturaCm;

    // Objetivo principal: GANHO_MASSA, PERDA_PESO, CONDICIONAMENTO, MANUTENCAO
    @Column(name = "OBJETIVO", length = 50)
    private String objetivo;

    // Nível de experiência: INICIANTE, INTERMEDIARIO, AVANCADO
    @Column(name = "NIVEL_EXPERIENCIA", length = 30)
    private String nivelExperiencia;

    @Column(name = "FREQUENCIA_SEMANAL_ALVO")
    private Integer frequenciaSemanAlvo;

    @Column(name = "URL_FOTO_PERFIL")
    private String urlFotoPerfil;

    @Column(name = "DATA_CADASTRO", nullable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @Column(name = "ATIVO", nullable = false)
    private Boolean ativo;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Treino> treinos;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Meta> metas;

    @PrePersist
    protected void prePersist() {
        this.dataCadastro = LocalDateTime.now();
        this.ativo = true;
    }
}
