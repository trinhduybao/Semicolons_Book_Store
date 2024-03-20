package com.semicolons_book_store.repository;

import com.semicolons_book_store.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    // Các phương thức tùy chỉnh có thể được thêm vào đây nếu cần
    Account findByUsername(String username);
}
