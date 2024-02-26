package com.semicolons_book_store.service;

import com.semicolons_book_store.model.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getAll();

    Category getOne(Integer id);

    Category save(Category category);

    Category update(Category category);

    void delete(Integer id);



}
