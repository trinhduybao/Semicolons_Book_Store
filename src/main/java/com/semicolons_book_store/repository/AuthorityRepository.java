package com.semicolons_book_store.repository;

import com.semicolons_book_store.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    // Các phương thức tùy chỉnh có thể được thêm vào đây nếu cần
}
