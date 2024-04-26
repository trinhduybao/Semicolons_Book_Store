package com.semicolons_book_store.service;

import com.semicolons_book_store.model.Order;

import java.util.List;

public interface OrderService {

    List<Order> findByAccountId(Integer accountId);
    List<Order> findOrdersByAccountId(Integer accountId);



}
