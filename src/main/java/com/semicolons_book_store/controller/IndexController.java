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
}
