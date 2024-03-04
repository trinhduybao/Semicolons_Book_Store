package com.semicolons_book_store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.semicolons_book_store.model.Category;
import com.semicolons_book_store.service.CategoryService;

@Controller
public class CategoryController {

//	@Autowired
//	CategoryService categoryService;
//	
//	@RequestMapping("/category/list")
//	public String list(Model model) {
//			List<Category> list = categoryService.getAll();
//			model.addAttribute("cates", list);
//		return"customer/category";
//	}
}
