package com.semicolons_book_store.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List; // Import thư viện List

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private int idProduct;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Date orderDate;
    private double totalAmount;
    private String status;
    private String address;
    private String voucherId;
    private int accountId;
    private List<OrderItemDTO> items; // Danh sách các mặt hàng trong đơn hàng






}
