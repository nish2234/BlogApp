package com.blog.security;

import com.blog.payloads.UserDto;

import lombok.Data;

@Data
public class JWTAuthResponse {
         
	private String token; 
	
	private UserDto userDto;
}
