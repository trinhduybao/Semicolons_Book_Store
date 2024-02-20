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


	public Item() {
		super();
	}


	public Item(int id, String name, List<Category> categories) {
		super();
		this.id = id;
		this.name = name;
		this.categories = categories;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public List<Category> getCategories() {
		return categories;
	}


	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}
    
    
}
