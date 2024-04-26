package com.semicolons_book_store.service.serviceimpl;

import com.semicolons_book_store.model.Order;
import com.semicolons_book_store.repository.OrderRepository;
import com.semicolons_book_store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderSeverviceImpl implements OrderService {


    @Autowired
    private OrderRepository orderRepository;

    public List<Order> findOrdersByAccountId(Integer accountId) {
        return orderRepository.findByAccountId(accountId);
    }

    @Override
    public List<Order> findByAccountId(Integer accountId) {
        return List.of();
    }


}


