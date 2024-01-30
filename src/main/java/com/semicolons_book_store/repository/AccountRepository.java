package com.semicolons_book_store.repository;

import com.semicolons_book_store.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Integer> {
}
