package com.blog.services.impl;


import java.util.Date;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import com.blog.entities.Category;
import com.blog.entities.Post;
import com.blog.entities.User;
import com.blog.exception.ResourceNotFoundException;
import com.blog.payloads.CategoryDto;
import com.blog.payloads.PostDto;
import com.blog.payloads.PostResponse;
import com.blog.repositories.CategoryRepo;
import com.blog.repositories.PostRepo;
import com.blog.repositories.UserRepo;
import com.blog.services.PostService;
@Service
public class PostServiceImpl implements PostService {
     
	@Autowired
	private PostRepo postRepo;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private CategoryRepo categoryRepo;
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public PostDto createPost(PostDto postDto , Integer uid , Integer cid) {
	
		User u = userRepo.findById(uid).orElseThrow( () -> new ResourceNotFoundException("User", "id", uid));
		
		Category c = this.categoryRepo.findById(cid).orElseThrow(()->new ResourceNotFoundException("Category", "id" , cid));
		
		Post post = this.modelMapper.map(postDto, Post.class);
	
		post.setDate(new Date());
		post.setImage("default.png");
		post.setCategory(c);
		post.setUser(u);
		
		Post savedpost = this.postRepo.save(post);
		return this.modelMapper.map(savedpost, PostDto.class);
	}

	@Override
	public PostDto updatePost(PostDto postDto, Integer pid) {
		Post post = this.postRepo.findById(pid).orElseThrow(() -> new ResourceNotFoundException("Post", "id", pid));
		post.setTitle(postDto.getTitle());
		post.setContent(postDto.getContent());
		post.setDate(new Date());
		post.setImage(postDto.getImage());
		Post updated = this.postRepo.save(post);
		return this.modelMapper.map(updated , PostDto.class);
	}

	@Override
	public void deletePost(Integer pid) {
		Post post = this.postRepo.findById(pid).orElseThrow(() -> new ResourceNotFoundException("Post", "id", pid));
		this.postRepo.delete(post);

	}

	@Override
	public PostDto getPostbyId(Integer pid) {
		Post post = this.postRepo.findById(pid).orElseThrow(() -> new ResourceNotFoundException("Post" ,"id" , pid));
		return this.modelMapper.map(post, PostDto.class);
	}

	@Override
	public PostResponse getAllPost(Integer pageNumber, Integer pageSize , String sortBy) {
		
		
		//implementing pagination & sorting
	    Pageable p = PageRequest.of(pageNumber, pageSize , Sort.by(sortBy)); 
		Page<Post> findAll = this.postRepo.findAll(p);
		List<Post> posts = findAll.getContent();
		
		List<PostDto> postDtos  = posts.stream().map(post -> this.modelMapper.map(post, PostDto.class)).collect(Collectors.toList());
		
		PostResponse postResponse = new PostResponse();
		postResponse.setPosts(postDtos);
		postResponse.setPageNumber(findAll.getNumber());
		postResponse.setPageSize(findAll.getSize());
		postResponse.setTotalPosts(findAll.getTotalElements());
		postResponse.setTotalPages(findAll.getTotalPages());
		postResponse.setLast(findAll.isLast());
		
		return postResponse;
		
	}

	@Override
	public List<PostDto> getPosyByCategory(Integer cid) {
		Category c = this.categoryRepo.findById(cid).orElseThrow(()->new ResourceNotFoundException("Category", "id" , cid));
		List<Post> posts = this.postRepo.findByCategory(c);
		List<PostDto> postDtos  = posts.stream().map(post -> this.modelMapper.map(post, PostDto.class)).collect(Collectors.toList());
		return postDtos;
	}

	@Override
	public List<PostDto> getPosyByUser(Integer uid) {
		User u = userRepo.findById(uid).orElseThrow( () -> new ResourceNotFoundException("User", "id", uid));
		List<Post> posts = this.postRepo.findByUser(u);
		List<PostDto> postDtos  = posts.stream().map(post -> this.modelMapper.map(post, PostDto.class)).collect(Collectors.toList());
		return postDtos;
	}

	@Override
	public List<PostDto> searchPost(String keyword) {
	    List<Post> posts = postRepo.findByTitleContaining(keyword);
	    List<PostDto> postDtos  = posts.stream().map(post -> this.modelMapper.map(post, PostDto.class)).collect(Collectors.toList());
		return postDtos;
	}

}
