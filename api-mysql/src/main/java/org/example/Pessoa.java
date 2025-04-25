package org.example;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "pessoas")
@Data
public class Pessoa {
    @Id
    private Long id;
    private String nome;
    private String telefone;
}
