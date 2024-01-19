package com.blog.services;

import java.util.List;




import com.blog.payloads.PostDto;
import com.blog.payloads.PostResponse;

public interface PostService {
	
	
	PostDto createPost(PostDto postDto , Integer uid , Integer cid);
	PostDto updatePost(PostDto postDto , Integer pid);
	void deletePost(Integer pid);
	PostDto getPostbyId(Integer pid);
	PostResponse getAllPost(Integer pageNumber, Integer pageSize , String sortBy);
	
	List<PostDto> getPosyByCategory(Integer cid);
	List<PostDto> getPosyByUser(Integer uid);
	
	List<PostDto> searchPost(String keyword);

}
