package com.semicolons_book_store.controller;

import com.semicolons_book_store.model.Order;
import com.semicolons_book_store.model.OrderDetail;
import com.semicolons_book_store.repository.OrderDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class OrderDetailRestController {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @RequestMapping("/rest/orderDetail")
    public ResponseEntity<List<OrderDetail>> getAll(Model model){
        return ResponseEntity.ok(orderDetailRepository.findAll());
    }


    @GetMapping("/rest/orderDetail/{id}")
    public ResponseEntity<OrderDetail> getOne(@PathVariable("id") Integer id){
        if (!orderDetailRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(orderDetailRepository.findById(id).get());
    }

    @PostMapping("/rest/orderDetail")
    public ResponseEntity<OrderDetail> post(@RequestBody OrderDetail orderDetail){
        if (orderDetailRepository.existsById(orderDetail.getId())){
            return ResponseEntity.badRequest().build();
        }
        orderDetailRepository.save(orderDetail);
        return ResponseEntity.ok(orderDetail);
    }

    @PutMapping("/rest/orderDetail/{id}")
    public ResponseEntity<OrderDetail> put(@PathVariable("id") Integer id, @RequestBody OrderDetail orderDetail){
        if (!orderDetailRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        orderDetailRepository.save(orderDetail);
        return ResponseEntity.ok(orderDetail);
    }

    @DeleteMapping("/rest/deleteOrderDetail/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Integer id){
        if (!orderDetailRepository.existsById(id)){
            return ResponseEntity.notFound().build();
        }
        orderDetailRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/rest/orderDetail/order/{orderId}")
    public ResponseEntity<List<OrderDetail>> getOrderDetailsByOrderId(@PathVariable("orderId") Integer orderId) {
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderId(orderId);
        if (orderDetails.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(orderDetails);
    }


}
