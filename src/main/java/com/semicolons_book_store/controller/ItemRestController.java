package com.semicolons_book_store.controller;

import com.semicolons_book_store.model.Item;
import com.semicolons_book_store.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")

public class ItemRestController {
    @Autowired
    ItemRepository itemRepository;

    @GetMapping("/rest/items")
    public ResponseEntity<List<Item>> getAll(Model model){
        return ResponseEntity.ok(itemRepository.findAll());
    }


    @GetMapping("/rest/items{id}")
    public ResponseEntity<Item> getOne(@PathVariable("id") Integer id){
        if (!itemRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(itemRepository.findById(id).get());
    }

    @PostMapping("/rest/items")
    public ResponseEntity<Item> post(@RequestBody Item item){
        if (itemRepository.existsById(item.getId())){
            return ResponseEntity.badRequest().build();
        }
        itemRepository.save(item);
        return ResponseEntity.ok(item);
    }

    @PutMapping("/rest/items/{id}")
    public ResponseEntity<Item> put(@PathVariable("id") Integer id, @RequestBody Item item){
        if (!itemRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        itemRepository.save(item);
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/rest/items/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id){
        if (!itemRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        itemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
