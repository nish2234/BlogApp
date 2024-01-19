package com.blog.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.exception.ApiResponse;
import com.blog.payloads.CategoryDto;
import com.blog.services.CategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@PostMapping("/")
	public ResponseEntity<CategoryDto> createCategoryController(@Valid @RequestBody CategoryDto categoryDto){
		CategoryDto createCategory = this.categoryService.createCategory(categoryDto);
		return new ResponseEntity<CategoryDto>(createCategory , HttpStatus.CREATED);
	}
	
	@PutMapping("/{cid}")
	public ResponseEntity<CategoryDto> updateCategoryController(@Valid @RequestBody CategoryDto categoryDto , @PathVariable("cid") Integer cid){
         CategoryDto updateCategory = this.categoryService.updateCategory(categoryDto, cid);		
         return new ResponseEntity<CategoryDto>(updateCategory , HttpStatus.OK);
	}
	
	@DeleteMapping("/{cid}")
	public ResponseEntity<ApiResponse> deleteCategoryController(@PathVariable("cid") Integer cid){
         this.categoryService.deleteCategory(cid);		
         return new ResponseEntity<ApiResponse>(new ApiResponse("Category Deleted Successfully",  true ) , HttpStatus.OK);
	}
	
	@GetMapping("/{cid}")
	public ResponseEntity<CategoryDto> getCategoryByIdController(@PathVariable("cid") Integer cid){
        CategoryDto categoryById = this.categoryService.getCategoryById(cid);		
        return new ResponseEntity<CategoryDto>(categoryById, HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<CategoryDto>> getCategoryController(){
        List<CategoryDto> allCategory = this.categoryService.getAllCategory();		
        return new ResponseEntity<List<CategoryDto>>(allCategory, HttpStatus.OK);
	}
	
	

}
