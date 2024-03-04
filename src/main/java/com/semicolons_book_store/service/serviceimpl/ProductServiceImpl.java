package com.semicolons_book_store.service.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.semicolons_book_store.model.Product;
import com.semicolons_book_store.repository.ProductRepository;
import com.semicolons_book_store.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
	@Autowired
	ProductRepository pRepository;

	@Override
	public List<Product> findAll() {
		return pRepository.findAll();
	}

	@Override
	public Page<Product> findAll(Integer pageNo) {
		Pageable pageable = PageRequest.of(pageNo - 1, 9);
		return this.pRepository.findAll(pageable);		
	}

	@Override
	public Product findById(Integer id) {
		return pRepository.findById(id).get();
	}

	@Override
	public Page<Product> findByCategoryId(Integer cid, Integer pageNo) {
		Pageable pageable = PageRequest.of(pageNo - 1, 9);
		return this.pRepository.findByCategoryId(cid, pageable);
	}
	
}
