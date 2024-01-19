package com.blog.payloads;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;



import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter

public class PostDto {
	
    private Integer pid;
	private String title;
	private String content;
	private String image;
	private Date date;
	private CategoryDto category;
	private UserDto user;
	private List<CommentDto> comments = new ArrayList<>();
}
