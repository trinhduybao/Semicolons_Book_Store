package com.semicolons_book_store.repository;

import com.semicolons_book_store.model.Product;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Integer> {

	Page<Product> findByCategoryId(Integer cid, Pageable pageable);
	
	List<Product> findByCategoryId(Integer cid);
		
	@Query("select p from Product p where p.name like %?1%")
	List<Product> searchProduct(String keyword);
	
	
}
