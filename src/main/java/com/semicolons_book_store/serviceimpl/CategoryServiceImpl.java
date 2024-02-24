/*package com.semicolons_book_store.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.semicolons_book_store.model.Category;
import com.semicolons_book_store.repository.CategoryRepository;
import com.semicolons_book_store.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{
	@Autowired
	CategoryRepository cRepository;
	
	@Override
	public List<Category> getAll() {
		return cRepository.findAll();
	}

	@Override
	public Category getOne(Integer id) {
		return null;
	}

	@Override
	public Category save(Category category) {
		return null;
	}

	@Override
	public Category update(Category category) {
		return null;
	}

	@Override
	public void delete(Integer id) {

	}

}*/
