//package com.semicolons_book_store.controller;
//
//
//import com.semicolons_book_store.model.Account;
//import com.semicolons_book_store.model.Order;
//import com.semicolons_book_store.repository.ManagerAccountRepository;
//import com.semicolons_book_store.service.AccountService;
//import com.semicolons_book_store.service.serviceimpl.OrderSeverviceImpl;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@CrossOrigin("*")
//public class ProfileRestController {
//
//@Autowired
//private ManagerAccountRepository managerAccountRepository;
//
//private OrderSeverviceImpl orderSevervice;
//
//    @GetMapping("/rest/accounts/{id}")
//    public ResponseEntity<Account> getOne(@PathVariable("id") Integer id) {
//        if (!managerAccountRepository.existsById(id)) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(managerAccountRepository.findById(id).get());
//    }
//
//
//    @GetMapping("/rest/order/{id}")
//    public ResponseEntity<Account> getOne(@PathVariable("id") Integer id) {
//        if (!managerAccountRepository.existsById(id)) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(managerAccountRepository.findById(id).get());
//    }
//
//
//
//}
