package com.semicolons_book_store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @RequestMapping
    public String admin(Model model) {
        return"admin/index";
    }

    @RequestMapping("/category")
    public String category(Model model) {
        return"admin/pages/category/category";
    }

    @RequestMapping("/product")
    public String product(Model model) {
        return"admin/pages/product/product";
    }

    @RequestMapping("/account")
    public String account(Model model) {
        return"admin/pages/account/account";
    }

    @RequestMapping("/order")
    public String order(Model model) {
        return"admin/pages/order/order";
    }

    @RequestMapping("/feedback")
    public String feedback(Model model) {
        return"admin/pages/feedbacks/feedback";
    }

    @RequestMapping("/voucher")
    public String voucher(Model model) {
        return"admin/pages/voucher/voucher";
    }

}
