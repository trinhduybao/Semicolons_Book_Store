package com.semicolons_book_store.controller;

import com.semicolons_book_store.model.Account;
import com.semicolons_book_store.model.Feedback;
import com.semicolons_book_store.repository.ManagerFeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class FeedBackManagerRestController {
    @Autowired
    ManagerFeedbackRepository managerFeedbackRepository;

    @RequestMapping("/rest/feedbacks")
    public ResponseEntity<List<Feedback>> getAll(Model model){
        return ResponseEntity.ok(managerFeedbackRepository.findAll());
    }

    @GetMapping("/rest/feedbacks/{id}")
    public ResponseEntity<Feedback> getOne(@PathVariable("id") Long id){
        if (!managerFeedbackRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(managerFeedbackRepository.findById(id).get());
    }

    @PostMapping("/rest/feedbacks")
    public ResponseEntity<Feedback> post(@RequestBody Feedback feedback){
        if (managerFeedbackRepository.existsById(feedback.getId())){
            return ResponseEntity.badRequest().build();
        }
        managerFeedbackRepository.save(feedback);
        return ResponseEntity.ok(feedback);
    }

    @PutMapping("/rest/feedbacks/{id}")
    public ResponseEntity<Feedback> put(@PathVariable("id") Long id, @RequestBody Feedback feedback){
        if (!managerFeedbackRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        managerFeedbackRepository.save(feedback);
        return ResponseEntity.ok(feedback);
    }

    @DeleteMapping("/rest/deleteFeedbacks/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id){
        if (!managerFeedbackRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        managerFeedbackRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/rest/updateBanFeedback/{id}")
    public ResponseEntity<Feedback> updateBanStatus(@PathVariable("id") Long id, @RequestParam("ban") boolean ban) {
        if (!managerFeedbackRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        Feedback feedback = managerFeedbackRepository.findById(id).get();
        feedback.setBan(ban); // Cập nhật trạng thái ban
        managerFeedbackRepository.save(feedback); // Lưu thay đổi vào cơ sở dữ liệu

        return ResponseEntity.ok(feedback);
    }



}
