package com.semicolons_book_store.controller;

import com.semicolons_book_store.model.Account;
import com.semicolons_book_store.model.Order;
import com.semicolons_book_store.model.Product;
import com.semicolons_book_store.repository.ManagerProductRepository;
import com.semicolons_book_store.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("*")
public class OrderRestController {

    @Autowired
    OrderRepository orderRepository;

    @RequestMapping("/rest/orders")
    public ResponseEntity<List<Order>> getAll(Model model){
        return ResponseEntity.ok(orderRepository.findAll());
    }


    @GetMapping("/rest/orders/{id}")
    public ResponseEntity<Order> getOne(@PathVariable("id") Integer id){
        if (!orderRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orderRepository.findById(id).get());
    }

    @PostMapping("/rest/orders")
    public ResponseEntity<Order> post(@RequestBody Order order){
        if (orderRepository.existsById(order.getId())){
            return ResponseEntity.badRequest().build();
        }
        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/rest/orders/{id}")
    public ResponseEntity<Order> put(@PathVariable("id") Integer id, @RequestBody Order order){
        if (!orderRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }

    @DeleteMapping("/rest/deleteOrders/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id){
        if (!orderRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        orderRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
