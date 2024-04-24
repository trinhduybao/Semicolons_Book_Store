package com.semicolons_book_store.controller;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import com.semicolons_book_store.model.Feedback;
import com.semicolons_book_store.model.Order;
import com.semicolons_book_store.model.OrderDetail;
import com.semicolons_book_store.repository.FeedbackRepository;
import com.semicolons_book_store.repository.ManagerFeedbackRepository;
import com.semicolons_book_store.repository.OrderDetailRepository;
import com.semicolons_book_store.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.semicolons_book_store.model.Product;
import com.semicolons_book_store.service.ProductService;

@Controller
public class ProductController {
	@Autowired
	ProductService productService;

	@Autowired
	ManagerFeedbackRepository managerFeedbackRepository;

	@RequestMapping("/product/list")
	public String listProduct(Model model, @Param("keyword") String keyword, @RequestParam(name = "pageNo", defaultValue = "1") Integer pageNo, @RequestParam("cid") Optional<Integer> cid) {
		
		Page<Product> list = productService.findAll(pageNo);
		
		
		if (keyword != null) {
			list = productService.searchproduct(keyword, pageNo);
			model.addAttribute("keyword", keyword);
		}
		if (cid.isPresent()) {
			list = productService.findByCategoryId(cid.get(), pageNo);
			model.addAttribute("cid", list);
		}
		
		
		model.addAttribute("totalPage", list.getTotalPages());
		model.addAttribute("currentPage", pageNo);
		model.addAttribute("items", list);
		return "customer/category";
	}
	
	
	
	@RequestMapping("/product/detail/{id}")
	public String detail(Model model, @PathVariable("id") Integer id) {
		Product item = productService.findById(id);
		model.addAttribute("item", item);

		List<Feedback> feedbacks = managerFeedbackRepository.findByProductId(id);
		model.addAttribute("feedbacks", feedbacks);

		double averageRating = calculateAverageRating(feedbacks);
		model.addAttribute("averageRating", averageRating);

//		System.out.println(feedbacks);




		return"customer/single-product";
	}

	private double calculateAverageRating(List<Feedback> feedbacks) {
		int totalRating = 0;
		for (Feedback feedback : feedbacks) {
			totalRating += feedback.getRate();
		}
		if (feedbacks.size() > 0) {
			return (double) totalRating / feedbacks.size();
		} else {
			return 0; // Trường hợp không có phản hồi
		}
	}

}
