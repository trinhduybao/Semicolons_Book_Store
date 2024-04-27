package com.semicolons_book_store.repository;

import com.semicolons_book_store.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
    // Các phương thức tùy chỉnh có thể được thêm vào đây nếu cần
    List<OrderDetail> findByOrderId(Integer orderId);


}
