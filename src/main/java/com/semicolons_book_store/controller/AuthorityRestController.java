package com.semicolons_book_store.controller;

import com.semicolons_book_store.model.Account;
import com.semicolons_book_store.model.Authority;
import com.semicolons_book_store.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class AuthorityRestController {

    @Autowired
    private AuthorityRepository authorityRepository;

    @PostMapping("/rest/authority")
    public ResponseEntity<Authority> post(@RequestBody Authority authority) {
        if (authorityRepository.existsById(authority.getAuthorityId())) {
            return ResponseEntity.badRequest().build();
        }

        authorityRepository.save(authority);
        return ResponseEntity.ok(authority);
    }


}
