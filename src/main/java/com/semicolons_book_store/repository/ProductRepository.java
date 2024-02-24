package com.semicolons_book_store.repository;

import com.semicolons_book_store.model.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {

	Page<Product> findByCategoryId(Integer cid, Pageable pageable);

}
