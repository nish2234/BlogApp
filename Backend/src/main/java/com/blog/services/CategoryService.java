package com.blog.services;

import java.util.List;

import com.blog.payloads.CategoryDto;

public interface CategoryService {
      
	 public CategoryDto createCategory(CategoryDto categoryDto);
	 public CategoryDto updateCategory(CategoryDto categoryDto , Integer cid);
	 public void deleteCategory(Integer cid);
	 public CategoryDto getCategoryById(Integer id);
	 public List<CategoryDto> getAllCategory();
}
