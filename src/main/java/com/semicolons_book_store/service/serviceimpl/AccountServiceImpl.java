package com.semicolons_book_store.service.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.semicolons_book_store.model.Account;
import com.semicolons_book_store.repository.AccountRepository;
import com.semicolons_book_store.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService{
	@Autowired
	AccountRepository accountRepository;

	@Override
	public Account findById(Integer id) {
		return accountRepository.findById(id).get();
	}

	/*@Override
	public Account findByUser(String username) {
		return accountRepository.findByUser(username);
	}*/

	@Override
	public Account findByUsername(String username) {
		return accountRepository.findByUsername(username);
	}


}
