package com.blog.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.entities.Category;
import com.blog.exception.ResourceNotFoundException;
import com.blog.payloads.CategoryDto;
import com.blog.repositories.CategoryRepo;
import com.blog.services.CategoryService;

@Service

public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryRepo categoryRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CategoryDto createCategory(CategoryDto categoryDto) {
		
		Category cat = this.modelMapper.map(categoryDto, Category.class);
		Category saveddata = this.categoryRepo.save(cat);
		return this.modelMapper.map(saveddata, CategoryDto.class);
	}

	@Override
	public CategoryDto updateCategory(CategoryDto categoryDto, Integer cid) {
		Category cat = this.categoryRepo.findById(cid).orElseThrow(()->new ResourceNotFoundException("Category", "id" , cid));
		cat.setCategoryTitle(categoryDto.getCategoryTitle());
		cat.setCategoryDesc(categoryDto.getCategoryDesc());
		Category updateddata = this.categoryRepo.save(cat);
		return this.modelMapper.map(updateddata, CategoryDto.class);
	}

	@Override
	public void deleteCategory(Integer cid) {
		Category cat = this.categoryRepo.findById(cid).orElseThrow(()->new ResourceNotFoundException("Category", "id" , cid));
		categoryRepo.delete(cat);

	}

	@Override
	public CategoryDto getCategoryById(Integer cid) {
		Category cat = this.categoryRepo.findById(cid).orElseThrow(()->new ResourceNotFoundException("Category", "id" , cid));
		return this.modelMapper.map(cat, CategoryDto.class);
	}

	@Override
	public List<CategoryDto> getAllCategory() {
		List<Category> categories = categoryRepo.findAll();
		List<CategoryDto> cat = categories.stream().map(category -> this.modelMapper.map(category, CategoryDto.class)).collect(Collectors.toList());
		return cat;
	}

}
