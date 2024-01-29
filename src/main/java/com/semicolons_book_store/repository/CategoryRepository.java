package com.semicolons_book_store.repository;

import com.semicolons_book_store.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    // Các phương thức tùy chỉnh có thể được thêm vào đây nếu cần
    boolean existsByName(String name);

}