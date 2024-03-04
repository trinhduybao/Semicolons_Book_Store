package com.semicolons_book_store.repository;

import com.semicolons_book_store.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    // Các phương thức tùy chỉnh có thể được thêm vào đây nếu cần
}