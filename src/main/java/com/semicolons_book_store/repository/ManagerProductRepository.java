package com.semicolons_book_store.repository;

import com.semicolons_book_store.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerProductRepository extends JpaRepository<Product, Integer> {
}