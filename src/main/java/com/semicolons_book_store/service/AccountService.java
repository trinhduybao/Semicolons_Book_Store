package com.semicolons_book_store.service;

import com.semicolons_book_store.model.Account;

public interface AccountService {
	Account findById(Integer id);
	
	Account findByUser(String username);
}
