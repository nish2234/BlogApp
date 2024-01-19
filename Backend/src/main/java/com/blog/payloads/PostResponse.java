package com.blog.payloads;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter


public class PostResponse {
      
	
	private List<PostDto> posts;
	private Integer pageNumber;
	private Integer pageSize;
	private Long totalPosts;
	private Integer totalPages;
	private boolean isLast;

	
	
}
