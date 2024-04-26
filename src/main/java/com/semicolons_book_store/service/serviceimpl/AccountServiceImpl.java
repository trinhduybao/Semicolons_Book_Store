package com.semicolons_book_store.service.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.semicolons_book_store.model.Account;
import com.semicolons_book_store.repository.AccountRepository;
import com.semicolons_book_store.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService{
	@Autowired
	AccountRepository accountRepository;
	
//	@Autowired
//    private PasswordEncoder passwordEncoder;
	
	@Override
	public Account findById(Integer id) {
		return accountRepository.findById(id).get();
	}
	
	

//	@Override
//	public Account findByUser(String username) {
//		return accountRepository.findByUser(username);
//	}

	@Override
	public Account findByUsername(String username) {
		return accountRepository.findByUsername(username);
	}


	public UserDetails getCurrentUserDetails() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null) {
			Object principal = authentication.getPrincipal();
			if (principal instanceof UserDetails) {
				return (UserDetails) principal;
			}
		}
		return null;
	}



	@Override
	public Account registerAccount(String username, String password, String firstName, String lastName, String email,
			String address) {
//		if (findByUsername(username) != null) {
//            throw new RuntimeException("Tên người dùng đã tồn tại");
//        }
		Account account = new Account();
		account.setUsername(username);
		account.setPassword(password);
		account.setFirstName(firstName);
		account.setLastName(lastName);
		account.setEmail(email);
		account.setAddress(address);
		return accountRepository.save(account);
	}

}
