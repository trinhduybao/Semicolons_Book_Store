package com.semicolons_book_store.controller;

import com.semicolons_book_store.model.Voucher;
import com.semicolons_book_store.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("*")
public class ManagerVoucherRestController {

    @Autowired
    VoucherRepository voucherRepository;

    @RequestMapping("/rest/voucherManager")
    public ResponseEntity<List<Voucher>> getAll(Model model){
        return ResponseEntity.ok(voucherRepository.findAll());
    }


    @GetMapping("/rest/voucherManager/{id}")
    public ResponseEntity<Voucher> getOne(@PathVariable("id") Integer id){
        if (!voucherRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(voucherRepository.findById(id).get());
    }

    @PostMapping("/rest/voucherManager")
    public ResponseEntity<Voucher> post(@RequestBody Voucher voucher){
        if (voucherRepository.existsById(voucher.getId())){
            return ResponseEntity.badRequest().build();
        }
        voucherRepository.save(voucher);
        return ResponseEntity.ok(voucher);
    }

    @PutMapping("/rest/voucherManager/{id}")
    public ResponseEntity<Voucher> put(@PathVariable("id") Integer id, @RequestBody Voucher voucher){
        if (!voucherRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        voucherRepository.save(voucher);
        return ResponseEntity.ok(voucher);
    }

    @DeleteMapping("/rest/deletevoucherManager/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id){
        if (!voucherRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        voucherRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
