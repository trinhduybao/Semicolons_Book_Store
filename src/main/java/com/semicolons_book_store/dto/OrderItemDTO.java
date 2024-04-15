package com.semicolons_book_store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {

    private int productId;
    private double count;
    private int quantity;
    private int orderId;
//    private int productIds;



}
