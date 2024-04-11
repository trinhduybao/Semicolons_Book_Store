package com.semicolons_book_store.controller;

import com.semicolons_book_store.dto.OrderDTO;
import com.semicolons_book_store.dto.OrderRequest;
import com.semicolons_book_store.model.Account;
import com.semicolons_book_store.model.Order;
import com.semicolons_book_store.model.Product;
import com.semicolons_book_store.repository.ManagerProductRepository;
import com.semicolons_book_store.repository.OrderRepository;
import com.semicolons_book_store.service.OrderService;
import com.semicolons_book_store.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin("*")
public class OrderRestController {
    @Autowired
    private OrderService orderService;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    private SecurityService securityService;


    @RequestMapping("/rest/orders")
    public ResponseEntity<List<Order>> getAll(Model model){
        return ResponseEntity.ok(orderRepository.findAll());
    }


    @GetMapping("/rest/orders/{id}")
    public ResponseEntity<Order> getOne(@PathVariable("id") Integer id){
        if (!orderRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orderRepository.findById(id).get());
    }

    @PostMapping("/rest/orders")
    public ResponseEntity<Order> post(@RequestBody Order order){
        if (orderRepository.existsById(order.getId())){
            return ResponseEntity.badRequest().build();
        }
        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/rest/orders/{id}")
    public ResponseEntity<Order> put(@PathVariable("id") Integer id, @RequestBody Order order){
        if (!orderRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        orderRepository.save(order);
        return ResponseEntity.ok(order);
    }

    @DeleteMapping("/rest/deleteOrders/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id){
        if (!orderRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        orderRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/rest/place-order")
    public ResponseEntity<String> placeOrder(@RequestBody OrderDTO orderData) {

        // Tạo đối tượng Order từ thông tin trong OrderRequest
        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setTotalAmount(BigDecimal.valueOf(orderData.getTotalAmount()));
        order.setStatus("Đã đặt hàng");
        order.setAddress(orderData.getAddress());
        order.setId(orderData.getAccountId());


        // Lưu đối tượng Order vào cơ sở dữ liệu
        order = orderRepository.save(order);

        // Trả về thông tin đơn hàng đã được lưu
        return ResponseEntity.ok("Đặt hàng thành công!");
    }

}
