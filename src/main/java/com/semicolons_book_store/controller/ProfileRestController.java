package com.semicolons_book_store.controller;


import com.semicolons_book_store.model.Account;
import com.semicolons_book_store.model.Order;
import com.semicolons_book_store.service.AccountService;
import com.semicolons_book_store.service.serviceimpl.OrderSeverviceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin("*")
public class ProfileRestController {

    @Autowired
    AccountService accountService;

    @Autowired
    OrderSeverviceImpl orderSevervice;

    @GetMapping("/getAllprofile")
    public String profile(Model model, @PathVariable("id") Integer id) {
        Account account = accountService.findById(id);
        model.addAttribute("account", account);

        Order order = (Order) orderSevervice.findOrdersByAccountId(id);
        model.addAttribute("order", order);


        return "";
    }


}
