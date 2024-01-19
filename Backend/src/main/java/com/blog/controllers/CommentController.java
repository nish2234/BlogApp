package com.blog.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.exception.ApiResponse;
import com.blog.payloads.CommentDto;
import com.blog.services.CommentService;

@RestController
@RequestMapping("/api/")
public class CommentController {
 
	@Autowired
	private CommentService commentService; 
	
	@PostMapping("comment/{pid}")
	public ResponseEntity<CommentDto> createCommentController(@RequestBody CommentDto commentDto 
			  , @PathVariable("pid") Integer pid){
		  CommentDto createComment = this.commentService.createComment(commentDto, pid);
	      return new ResponseEntity<CommentDto>(createComment , HttpStatus.CREATED);
	}
	
	@DeleteMapping("comment/{cid}")
	public ResponseEntity<ApiResponse> deleteCommentController(@PathVariable("cid") Integer cid){
		this.commentService.deleteComment(cid);
		return new ResponseEntity<ApiResponse>(new ApiResponse("comment deleted", true) , HttpStatus.OK);
	}
}
