package com.semicolons_book_store.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.semicolons_book_store.model.Product;

public interface ProductService {

	List<Product> findAll();
	
	Page<Product> findAll(Integer pageNo);

	Product findById(Integer id);

	Page<Product> findByCategoryId(Integer integer, Integer pageNo);
	
	List<Product> findByCategoryId(Integer integer);
	
	List<Product> searchproduct(String keyword);
	
	Page<Product> searchproduct(String keyword, Integer pageNo);
	
	
}
