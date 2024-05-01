package com.semicolons_book_store.service;

import com.semicolons_book_store.model.Account;
import com.semicolons_book_store.model.Authority;
import com.semicolons_book_store.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class SecurityService
        implements UserDetailsService {

    @Autowired
    private AccountService accountService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            Account account = accountService.findByUsername(username);
            if (account == null) {
                throw new UsernameNotFoundException("User not found with username: " + username);
            }

            Set<String> roles = new HashSet<>();
            for (Authority authority : account.getAuthorities()) {
                roles.add(authority.getRole().getName());
            }

            return User.withUsername(username)
                    .password(passwordEncoder.encode(account.getPassword()))
                    .roles(roles.toArray(new String[0]))
                    .build();
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    public Account findAccountByUsername(String username) {
        return accountService.findByUsername(username);
    }

    public boolean isNotAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication == null || !authentication.isAuthenticated() || !authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_admin"));
    }
}
