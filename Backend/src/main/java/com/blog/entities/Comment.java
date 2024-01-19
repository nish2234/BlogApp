package com.blog.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity

@NoArgsConstructor
@Getter
@Setter

public class Comment {
       
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer comment_id;
	
	private String content;
	
	@ManyToOne
	private Post post;
	
}
