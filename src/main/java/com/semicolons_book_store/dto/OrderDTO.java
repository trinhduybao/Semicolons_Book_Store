package com.semicolons_book_store.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class OrderDTO {

    private Date orderDate;
    private double totalAmount;
    private String status;
    private String address;
    private String voucherId;
    private int accountId;
}
