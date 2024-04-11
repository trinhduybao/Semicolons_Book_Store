package com.semicolons_book_store.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailsDTO {
    private int id;
    private String username;
    private String password;
    private String address;
}
