package com.blog.entities;

import jakarta.persistence.Entity;



import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity

@NoArgsConstructor
@Getter
@Setter


public class Role {
      
	 @Id
	 private Integer role_id;
	 
	 private String name;
	 
}
