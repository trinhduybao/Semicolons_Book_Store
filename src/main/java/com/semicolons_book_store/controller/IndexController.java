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

	@RequestMapping("/home")
	public String index2(Model model) {
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
	
	@RequestMapping("/profile/view")
	public String profile(Model model) {
		return"customer/profile";
	}

	@RequestMapping("/checkout")
	public String checkout(Model model) {
		return"customer/checkout";
	}

	@RequestMapping("/contact")
	public String contact(Model model) {
		return"customer/contact";
	}

	@RequestMapping("/tracking-order")
	public String trackingOrder(Model model) {
		return"customer/tracking-order";
	}


}
