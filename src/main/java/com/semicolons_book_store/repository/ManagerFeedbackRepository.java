package com.semicolons_book_store.repository;

import com.semicolons_book_store.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ManagerFeedbackRepository extends JpaRepository<Feedback,Long> {

    List<Feedback> findByProductId(Integer productId);

}
