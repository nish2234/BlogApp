package com.blog.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter

public class Post {
        
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Integer pid;
	private String title;
	
	@Column(length = 10000)
	private String content;
	private String image;
	private Date date;
	
	//many posts can be in one category
	@ManyToOne
	private Category category;
	
	@ManyToOne
	private User user;
	
	@OneToMany(mappedBy = "post" , cascade = CascadeType.ALL )
	private List<Comment> comments = new ArrayList<>();
	
}
