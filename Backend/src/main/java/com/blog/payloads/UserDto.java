package com.blog.payloads;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter

public class UserDto {
	
	private int user_id;
	
	@NotBlank
	@Size(min=3 , message = "Minimum Size Should Be 3")
	private String username;
	
	@Email
	@NotBlank
	private String email;
	
	@NotBlank
	private String password;
	
	@NotBlank
	private String about;
	
	private List<RoleDto> roles = new ArrayList<>();
	
	@JsonIgnore
	public String getPassword() {
		return  this.password;
	}
	
	@JsonProperty
	
	public void setPassword(String password) {
		this.password = password;
	}
}
