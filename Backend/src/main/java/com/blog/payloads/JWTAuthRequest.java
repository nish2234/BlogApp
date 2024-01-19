package com.blog.payloads;

import lombok.Data;

@Data
public class JWTAuthRequest {
          
	String username;
	String password;
}
