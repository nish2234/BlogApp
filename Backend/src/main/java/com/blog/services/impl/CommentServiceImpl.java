package com.blog.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.entities.Comment;
import com.blog.entities.Post;
import com.blog.exception.ResourceNotFoundException;
import com.blog.payloads.CommentDto;
import com.blog.repositories.CommentRepo;
import com.blog.repositories.PostRepo;
import com.blog.services.CommentService;

@Service

public class CommentServiceImpl implements CommentService {
	
	@Autowired
	private CommentRepo commentRepo;
	
	@Autowired
	private PostRepo postRepo;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CommentDto createComment(CommentDto comment, Integer pid) {
	    Post post = this.postRepo.findById(pid).orElseThrow(() -> new ResourceNotFoundException("Post" ,"id" , pid));
	    Comment c = this.modelMapper.map(comment, Comment.class);
	    c.setPost(post);
	    
	    Comment created = this.commentRepo.save(c);
	    
		return this.modelMapper.map(created, CommentDto.class);
	}

	@Override
	public void deleteComment(Integer cid) {
		Comment comment = this.commentRepo.findById(cid).orElseThrow(() -> new ResourceNotFoundException("Comment", "id", cid));
		this.commentRepo.delete(comment);

	}

}
