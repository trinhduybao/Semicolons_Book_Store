package com.semicolons_book_store.service;

import com.semicolons_book_store.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class SecurityService implements UserDetailsService {

    @Autowired
    private AccountService accountService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    SessionService sessionService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            Account account = accountService.findByUsername(username);
            System.out.println(account.getUsername());
            System.out.println(account.getPassword());
            System.out.println(account.getAddress());
            System.out.println(account.getAuthorities().size());
            //sessionService.set("account", account);
            // Tạo UserDetail từ Account
            String password = account.getPassword();
            String[] roles = account.getAuthorities().stream()
                    .map(au -> au.getRole().getName())
                    .toArray(String[]::new);
                    /* collect(Collectors.toList()).toArray(new String[0]*/
            return User.withUsername(username)
                    .password(passwordEncoder.encode(password))
                    .roles(roles)
                    .build();

        } catch (Exception e) {
            throw new UsernameNotFoundException(username + " not found !");
        }
    }
    /*public void loginFromOAuth2(OAuth2AuthenticationToken oauth2){
        String email = oauth2.getPrincipal().getAttribute("email");
        String password = Long.toHexString(System.currentTimeMillis());

        UserDetails user = User.withUsername(email)
                .password(passwordEncoder.encode(password))
                .roles("GUEST").build();
        Authentication auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);
    }*/
}