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

import com.blog.entities.User;
import com.blog.exception.ApiResponse;
import com.blog.payloads.UserDto;
import com.blog.services.UserService;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/api/users")

public class UserController {
         
	@Autowired
	private UserService userService;
	
	//post
	@PostMapping("/")
	public ResponseEntity<UserDto> createuser(@Valid @RequestBody UserDto user) {
	       
		UserDto createUser = userService.createUser(user);
		return new ResponseEntity<>(createUser , HttpStatus.CREATED);
	}
	
	@PutMapping("/{userid}")
	public ResponseEntity<UserDto> updateuser(@Valid @RequestBody UserDto userDto , @PathVariable("userid") Integer userid) {
		UserDto updateUser = userService.updateUser(userDto , userid);
		return new ResponseEntity<>(updateUser , HttpStatus.OK);
	}
	
	@DeleteMapping("/{userid}")
	public ResponseEntity<ApiResponse> deleteuser( @PathVariable("userid") Integer userid){
		userService.deleteUserById(userid);
		return new ResponseEntity<ApiResponse>(new ApiResponse("User Deleted Successfully",  true ) , HttpStatus.OK);
	}
	
	@GetMapping("/")
	public ResponseEntity<List<UserDto>> getalluser(){
		List<UserDto> allUser = userService.getAllUser();
		return new ResponseEntity<List<UserDto>>(allUser , HttpStatus.OK);
	}
	
	@GetMapping("/{userid}")
	public ResponseEntity<UserDto> getuserbyid(@PathVariable("userid") Integer userid){
		UserDto user = userService.getUserById(userid);
		return new ResponseEntity<>(user , HttpStatus.OK);
	}
	
	
	
}
