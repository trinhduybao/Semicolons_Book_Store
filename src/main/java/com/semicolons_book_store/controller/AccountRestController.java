package com.semicolons_book_store.controller;

import com.semicolons_book_store.dto.AccountDTO;
import com.semicolons_book_store.dto.AddressDTO;
import com.semicolons_book_store.model.Account;
import com.semicolons_book_store.repository.AccountRepository;
import com.semicolons_book_store.repository.ManagerAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class AccountRestController {
    @Autowired
    ManagerAccountRepository managerAccountRepository;
    @Autowired
    private AccountRepository accountRepository;

    @RequestMapping("/rest/accounts")
    public ResponseEntity<List<Account>> getAll(Model model) {
        return ResponseEntity.ok(managerAccountRepository.findAll());
    }


    @GetMapping("/rest/accounts/{id}")
    public ResponseEntity<Account> getOne(@PathVariable("id") Integer id) {
        if (!managerAccountRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(managerAccountRepository.findById(id).get());
    }

        @PostMapping("/rest/accounts")
        public ResponseEntity<Account> post(@RequestBody Account account) {
            if (managerAccountRepository.existsById(account.getId())) {
                return ResponseEntity.badRequest().build();
            }
            managerAccountRepository.save(account);
            return ResponseEntity.ok(account);
        }

    @PutMapping("/rest/accounts/{id}")
    public ResponseEntity<Account> put(@PathVariable("id") Integer id, @RequestBody Account account) {
        if (!managerAccountRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        managerAccountRepository.save(account);
        return ResponseEntity.ok(account);
    }

    @DeleteMapping("/rest/deleteAccounts/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
        if (!managerAccountRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        managerAccountRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/rest/updateBanAccount/{id}")
    public ResponseEntity<Account> updateBanStatus(@PathVariable("id") Integer id, @RequestParam("ban") boolean ban) {
        if (!managerAccountRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        Account account = managerAccountRepository.findById(id).get();
        account.setBan(ban); // Cập nhật trạng thái ban
        managerAccountRepository.save(account); // Lưu thay đổi vào cơ sở dữ liệu

        return ResponseEntity.ok(account);
    }


    @GetMapping("/current")
    public AccountDTO getCurrentUser(Authentication authentication) {
        String username = authentication.getName();
        Account account = accountRepository.findByUsername(username);

        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setId(account.getId());
        accountDTO.setUsername(account.getUsername());
        accountDTO.setPassword(account.getPassword());
        // Thiết lập các giá trị khác của tài khoản

        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setAddress(account.getAddress());
        // Thiết lập thông tin địa chỉ từ bảng Account

        accountDTO.setAddress(addressDTO);

        return accountDTO;
    }





}
