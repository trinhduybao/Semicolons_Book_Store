package com.semicolons_book_store.service.serviceimpl;

import com.semicolons_book_store.model.OrderDetail;
import com.semicolons_book_store.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDetailServiceImpl {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public List<OrderDetail> findByOrderId(Integer orderId) {
        return orderDetailRepository.findByOrderId(orderId);
    }
}
