package com.blog.services;

import com.blog.payloads.CommentDto;

public interface CommentService {
	
	CommentDto createComment(CommentDto comment , Integer post_id);
	void deleteComment(Integer cid);

}
