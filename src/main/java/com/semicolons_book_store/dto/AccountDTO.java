package com.semicolons_book_store.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AccountDTO {
    private int id;
    private String username;
    private String password;
    private AddressDTO address;
    // Các trường thông tin khác của tài khoản

    // Các phương thức getter và setter
}
