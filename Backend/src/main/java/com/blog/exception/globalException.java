package com.blog.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class globalException {
      
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> ResourcenotfoundexceptionHandler(ResourceNotFoundException ex){
		ApiResponse apiResponse = new ApiResponse(ex.getMessage() , false);
		return new ResponseEntity<ApiResponse>(apiResponse , HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String , String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex){
		  Map<String , String> map = new HashMap<>();
		  ex.getBindingResult().getAllErrors().forEach((error) -> {
			  String fieldname = ((FieldError)error).getField();
			  String errormsg = error.getDefaultMessage();
			  
			  map.put(fieldname, errormsg);
		  });
		  return new ResponseEntity<Map<String,String>>(map , HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<Map<String , String>> handleValidException(ConstraintViolationException ex){
		Map<String , String> map = new HashMap<>();
		
		
		 
		return new ResponseEntity<Map<String,String>>(map , HttpStatus.BAD_REQUEST);
	}
}
