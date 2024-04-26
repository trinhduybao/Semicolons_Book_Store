package com.semicolons_book_store.controller;

import com.semicolons_book_store.model.Account;
import com.semicolons_book_store.model.Order;
import com.semicolons_book_store.service.AccountService;
import com.semicolons_book_store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class IndexController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private AccountService accountService;

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
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		Account accountProfile = accountService.findByUsername(username);
		Integer accountId = accountProfile.getId();

		model.addAttribute("accountProfile", accountProfile);

		List<Order> orders = orderService.findOrdersByAccountId(accountId);
		model.addAttribute("orderProfile", orders);


		return "customer/profile";
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
