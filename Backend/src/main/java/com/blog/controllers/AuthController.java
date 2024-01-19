package com.blog.controllers;



import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.blog.entities.User;
import com.blog.payloads.JWTAuthRequest;
import com.blog.payloads.UserDto;
import com.blog.security.JWTAuthResponse;
import com.blog.security.JWTTokenHelper;
import com.blog.services.UserService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/auth")
public class AuthController {
       
	@Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;


    @Autowired
    private JWTTokenHelper helper;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private ModelMapper modelMapper;

  


    @PostMapping("/login")
    public ResponseEntity<JWTAuthResponse> login(@RequestBody JWTAuthRequest request) {
    	
        this.doAuthenticate(request.getUsername(), request.getPassword());

        
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
       
        String token = this.helper.generateToken(userDetails);
            
        
        JWTAuthResponse response = new JWTAuthResponse();
        response.setToken(token);
        response.setUserDto(this.modelMapper.map((User) userDetails, UserDto.class));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        
        try {
            manager.authenticate(authentication);
            System.out.println("Hello");
            

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }

    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }
    
    @PostMapping("/register")
    public ResponseEntity<UserDto> registerController(@Valid @RequestBody UserDto userDto){
    	
    	UserDto newUser = userService.registerNewUser(userDto);
    	
    	return new ResponseEntity<UserDto>(newUser , HttpStatus.CREATED);
    }
}
