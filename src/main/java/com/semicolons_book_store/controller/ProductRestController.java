package com.semicolons_book_store.controller;

import com.semicolons_book_store.model.Product;
import com.semicolons_book_store.repository.ManagerProductRepository;
import com.semicolons_book_store.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class ProductRestController {

    @Autowired
    ManagerProductRepository managerProductRepository;

    @Autowired
    private ProductService productService;


    @RequestMapping("/rest/productManager")
    public ResponseEntity<List<Product>> getAll(Model model){
        return ResponseEntity.ok(managerProductRepository.findAll());
    }


    @GetMapping("/rest/productManager/{id}")
    public ResponseEntity<Product> getOne(@PathVariable("id") Integer id){
        if (!managerProductRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(managerProductRepository.findById(id).get());
    }

    @PostMapping("/rest/productManager")
    public ResponseEntity<Product> post(@RequestBody Product product){
        if (managerProductRepository.existsById(product.getId())){
            return ResponseEntity.badRequest().build();
        }
        managerProductRepository.save(product);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/rest/productManager/{id}")
    public ResponseEntity<Product> put(@PathVariable("id") Integer id, @RequestBody Product product){
        if (!managerProductRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        managerProductRepository.save(product);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/rest/deleteProductManager/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id){
        if (!managerProductRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        managerProductRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/rest/productManager/check")
    public ResponseEntity<Boolean> checkProductNameExist(@RequestParam String name) {
        boolean isExist = managerProductRepository.existsByName(name);
        return ResponseEntity.ok(isExist);
    }
}
