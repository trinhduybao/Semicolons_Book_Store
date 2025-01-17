package com.semicolons_book_store.service;

import com.semicolons_book_store.model.Account;

public interface AccountService {
	Account findById(Integer id);
	
	Account findByUsername(String username);

	Account registerAccount(String username, String password, String firstName, String lastName, String email, String address);
	
	String changePassword(String username, String oldPassword, String newPassword, String confirmPassword);
	
}
