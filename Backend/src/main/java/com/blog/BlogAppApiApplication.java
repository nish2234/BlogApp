package com.blog;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.blog.entities.Role;
import com.blog.repositories.RoleRepository;

@SpringBootApplication
public class BlogAppApiApplication implements CommandLineRunner {

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepository roleRepository;
	
	public static void main(String[] args) {
		SpringApplication.run(BlogAppApiApplication.class, args);
	}
	
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	@Override
	public void run(String... args) throws Exception {
		
		System.out.println(passwordEncoder.encode("epoele"));
		
		try {
			
			Role role = new Role();
			//501 is for admin
			role.setRole_id(501);
			role.setName("ROLE_NORMAL");
			
			
			Role role1 = new Role();
			//502 is for normal users
			role1.setRole_id(502);
			role1.setName("ROLE_ADMIN");
			
			roleRepository.save(role);
			roleRepository.save(role1);
			
		} catch (Exception e) {
			// TODO: handle exception
			
			e.printStackTrace();
		}
		
	}

}
