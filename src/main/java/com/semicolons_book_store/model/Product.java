package com.semicolons_book_store.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "thumbnail_image", nullable = false)
    private String thumbnailImage;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "suppllier", nullable = false)
    private String supplier;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "author")
    private String author;

    @Column(name = "published_date")
    private LocalDate publishedDate;

    @Column(name = "page_count")
    private Integer pageCount;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "weight", nullable = false)
    private Integer weight;

    @Column(name = "size", nullable = false)
    private String size;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "brand")
    private String brand;

    @Column(name = "made_in")
    private String madeIn;

    @Column(name = "origin")
    private String origin;

    @Column(name = "color")
    private String color;

    @Column(name = "material")
    private String material;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
    
}
