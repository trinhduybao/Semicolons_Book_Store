package com.semicolons_book_store.dto;

import com.semicolons_book_store.model.Account;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data


public class OrderRequest {
    private BigDecimal totalAmount;
    private String address;
//    private Account account;

    // Constructors
    public OrderRequest() {
    }

    public OrderRequest(BigDecimal totalAmount, String address) {
        this.totalAmount = totalAmount;
        this.address = address;
    }

    // Getters and setters
    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
