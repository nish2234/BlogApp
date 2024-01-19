package com.blog.services.impl;

import java.util.List;

import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.blog.entities.Role;
import com.blog.entities.User;
import com.blog.exception.ResourceNotFoundException;
import com.blog.payloads.UserDto;
import com.blog.repositories.RoleRepository;
import com.blog.repositories.UserRepo;
import com.blog.services.UserService;


@Service


public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepo userRepo;
    
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepository roleRepo;

	@Override
	public UserDto createUser(UserDto user) {
		
		User u = this.dtoTOUser(user); 
		User saveduser = this.userRepo.save(u);
		return this.UserTODto(saveduser);
	}

	@Override
	public UserDto updateUser(UserDto user, Integer id) {
		User u = userRepo.findById(id).orElseThrow( () -> new ResourceNotFoundException("User", "id", id));
		
		
		u.setUsername(user.getUsername());
		u.setEmail(user.getEmail());
		u.setPassword(user.getPassword());
		u.setAbout(user.getAbout());
		User updateduser = this.userRepo.save(u);
		return this.UserTODto(updateduser);
	}

	@Override
	public UserDto getUserById(Integer id) {
		
		User u = userRepo.findById(id).orElseThrow( () -> new ResourceNotFoundException("User", "id", id));
		return this.UserTODto(u);
		
	}

	@Override
	public List<UserDto> getAllUser() {
		List<User> users = userRepo.findAll();
		List<UserDto> userDto = users.stream().map(user -> this.UserTODto(user)).collect(Collectors.toList()); 
		return userDto;
	}

	@Override
	public void deleteUserById(Integer id) {
		// TODO Auto-generated method stub
		User u = userRepo.findById(id).orElseThrow( () -> new ResourceNotFoundException("User", "id", id));
		userRepo.delete(u);
		

	}
	public User dtoTOUser(UserDto user) {
		
		//conversion using modelmapper
		
		User u = this.modelMapper.map(user, User.class);
		
		//manual change from userdto to user class
		//User u = new User();
		//u.setUser_id(user.getUser_id());
//		u.setUsername(user.getUsername());
//		u.setEmail(user.getEmail());
//		u.setPassword(user.getPassword());
//		u.setAbout(user.getAbout());
		return u;
		
	}
	
	public UserDto UserTODto(User user) {
	    UserDto u = this.modelMapper.map(user, UserDto.class);
		return u;
	}

	@Override
	public UserDto registerNewUser(UserDto userDto) {
		User user = this.modelMapper.map(userDto, User.class);
		
		//setting the encoded password
		user.setPassword(this.passwordEncoder.encode(userDto.getPassword()));
		
		//role set krna h(502 is set default for normal user and 501 for admin) 
		Role role = this.roleRepo.findById(501).get();
		user.getRoles().add(role);
		
		User save = this.userRepo.save(user);
		return this.modelMapper.map(save, UserDto.class);
	}

}
