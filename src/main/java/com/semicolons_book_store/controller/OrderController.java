package com.semicolons_book_store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OrderController {
	@RequestMapping("/order/checkout")
	public String checkout(Model model) {
		return"customer/checkout";
	}
	
	@RequestMapping("/order/list")
	public String list(Model model) {
		return"customer/profile";
	}
	
	@RequestMapping("/order/detail{id}")
	public String detail(Model model) {
		return"customer/orderdetail";
	}
}
