package com.semicolons_book_store.service.serviceimpl;


import com.semicolons_book_store.model.Feedback;
import com.semicolons_book_store.repository.ManagerFeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl {

    @Autowired
    private ManagerFeedbackRepository managerFeedbackRepository;

    public List<Feedback> getFeedbacksByProductId(Integer productId) {
        return managerFeedbackRepository.findByProductId(productId);
    }

}
