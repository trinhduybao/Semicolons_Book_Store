package com.semicolons_book_store.controller;

import com.semicolons_book_store.model.Account;
import com.semicolons_book_store.repository.ManagerAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class ManagerAccountRestController {
    @Autowired
    ManagerAccountRepository managerAccountRepository;

    @RequestMapping("/rest/accounts")
    public ResponseEntity<List<Account>> getAll(Model model){
        return ResponseEntity.ok(managerAccountRepository.findAll());
    }


    @GetMapping("/rest/accounts/{id}")
    public ResponseEntity<Account> getOne(@PathVariable("id") Integer id){
        if (!managerAccountRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(managerAccountRepository.findById(id).get());
    }

    @PostMapping("/rest/accounts")
    public ResponseEntity<Account> post(@RequestBody Account account){
        if (managerAccountRepository.existsById(account.getId())){
            return ResponseEntity.badRequest().build();
        }
        managerAccountRepository.save(account);
        return ResponseEntity.ok(account);
    }

    @PutMapping("/rest/accounts/{id}")
    public ResponseEntity<Account> put(@PathVariable("id") Integer id, @RequestBody Account account){
        if (!managerAccountRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        managerAccountRepository.save(account);
        return ResponseEntity.ok(account);
    }

    @DeleteMapping("/rest/deleteAccounts/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id){
        if (!managerAccountRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        managerAccountRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
