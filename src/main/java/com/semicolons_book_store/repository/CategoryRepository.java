package com.semicolons_book_store.repository;

import com.semicolons_book_store.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    boolean existsByName(String name);

    List<Category> findByItemId(Long itemId);


}