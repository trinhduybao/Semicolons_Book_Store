package com.semicolons_book_store.service;

import com.semicolons_book_store.model.Order;
import com.semicolons_book_store.model.OrderDetail;
import com.semicolons_book_store.repository.OrderDetailRepository;
import com.semicolons_book_store.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public void placeOrder(Order order) {
        // Lưu đơn hàng vào bảng order
        Order savedOrder = orderRepository.save(order);

        // Lưu chi tiết đơn hàng vào bảng order_details
        for (OrderDetail orderDetail : order.getOrderDetails()) {
            orderDetail.setOrder(savedOrder);
            orderDetailRepository.save(orderDetail);
        }
    }
}
