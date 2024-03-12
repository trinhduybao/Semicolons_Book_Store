package com.semicolons_book_store.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.semicolons_book_store.service.CategoryService;
import com.semicolons_book_store.service.ItemService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class GlobalInterceptor implements HandlerInterceptor{
	@Autowired
	CategoryService categoryService;
	
	@Autowired
	ItemService itemService;
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		request.setAttribute("cates", categoryService.getAll());
		request.setAttribute("item", itemService.getAll());
	}
	
	
}
