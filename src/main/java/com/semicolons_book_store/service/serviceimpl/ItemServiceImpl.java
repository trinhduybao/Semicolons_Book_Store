package com.semicolons_book_store.service.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.semicolons_book_store.model.Item;
import com.semicolons_book_store.repository.ItemRepository;
import com.semicolons_book_store.service.ItemService;

@Service
public class ItemServiceImpl implements ItemService{
	@Autowired
	ItemRepository itemRepository;

	@Override
	public List<Item> getAll() {
		return itemRepository.findAll();
	}
	
	
}
