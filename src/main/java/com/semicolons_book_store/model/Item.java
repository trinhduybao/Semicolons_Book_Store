package com.semicolons_book_store.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

	@Column(name = "name" , unique = true, nullable = false)
    private String name;


    @JsonIgnore
    @OneToMany(mappedBy = "item")
    private List<Category> categories;
}
