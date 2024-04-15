package com.semicolons_book_store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
	@RequestMapping("")
	public String index(Model model) {
		return"customer/index";
	}
	
	@RequestMapping("/cart/view")
	public String shoppingcart(Model model) {
		return"customer/cart";
	}
	
	@RequestMapping("/confirmation/view")
	public String confirmation(Model model) {
		return"customer/confirmation";
	}
	
	@RequestMapping("/login/view")
	public String login(Model model) {
		return"customer/page/login2";
	}
	
	@RequestMapping("/register/view")
	public String register(Model model) {
		return"customer/register";
	}
	
}
