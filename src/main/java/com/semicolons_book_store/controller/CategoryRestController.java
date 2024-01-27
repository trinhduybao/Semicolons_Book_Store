package com.semicolons_book_store.controller;

import com.semicolons_book_store.model.Category;
import com.semicolons_book_store.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")

public class CategoryRestController {
    @Autowired
    CategoryRepository categoryRepository;

    @RequestMapping("/rest/category")
    public ResponseEntity<List<Category>> getAll(Model model){
        return ResponseEntity.ok(categoryRepository.findAll());
    }


    @GetMapping("/rest/category/{id}")
    public ResponseEntity<Category> getOne(@PathVariable("id") Integer id){
        if (!categoryRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(categoryRepository.findById(id).get());
    }

    @PostMapping("/rest/category")
    public ResponseEntity<Category> post(@RequestBody Category category){
        if (categoryRepository.existsById(category.getId())){
            return ResponseEntity.badRequest().build();
        }
        categoryRepository.save(category);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/rest/category/{id}")
    public ResponseEntity<Category> put(@PathVariable("id") Integer id, @RequestBody Category category){
        if (!categoryRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        categoryRepository.save(category);
        return ResponseEntity.ok(category);
    }

    @DeleteMapping("/rest/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id){
        if (!categoryRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
