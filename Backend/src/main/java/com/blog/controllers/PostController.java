package com.blog.controllers;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blog.exception.ApiResponse;
import com.blog.payloads.PostDto;
import com.blog.payloads.PostResponse;
import com.blog.services.FileService;
import com.blog.services.PostService;

import jakarta.annotation.security.RolesAllowed;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/")
public class PostController {
    
	@Autowired
	private PostService postService; 
	
	@Autowired
	private FileService fileService;
	
	//inside value we have written the variable from application.properties
	@Value("${project.image}")
	private String path;
	
	// post blog
	@PostMapping("user/{userid}/category/{categoryid}/post")
	public ResponseEntity<PostDto> createPostController(@RequestBody PostDto postDto , @PathVariable("userid") Integer uid , @PathVariable("categoryid") Integer cid){

		PostDto createPost = postService.createPost(postDto, uid, cid);
	
		return new ResponseEntity<PostDto>(createPost , HttpStatus.CREATED);
	}
	
	// get by user
	@GetMapping("user/{userid}/post")
	public ResponseEntity<List<PostDto>> getPostByUserController(@PathVariable("userid") Integer uid){
		List<PostDto> postByUser = this.postService.getPosyByUser(uid);
		
		return new ResponseEntity<List<PostDto>>(postByUser , HttpStatus.OK);
	}
	// get by category
	@GetMapping("category/{categoryid}/post")
	public ResponseEntity<List<PostDto>> getPostByCategoryController(@PathVariable("categoryid") Integer cid){
		List<PostDto> postByCategory = this.postService.getPosyByCategory(cid);
		
		return new ResponseEntity<List<PostDto>>(postByCategory , HttpStatus.OK);
	}
	
	// get all post
	@GetMapping("post")
	public ResponseEntity<PostResponse> getAllPosts(
			@RequestParam(value = "pageNumber",  defaultValue = "0" , required = false) Integer pageNumber , 
			@RequestParam(value = "pageSize" , defaultValue = "5" , required = false) Integer pageSize , 
			@RequestParam(value = "sortBy" , defaultValue = "pid" , required = false) String sortBy
			){
		PostResponse allPost = this.postService.getAllPost(pageNumber , pageSize , sortBy);
		return new ResponseEntity<PostResponse>(allPost , HttpStatus.OK);
	}
	
	// get post by id
	@GetMapping("post/{pid}")
	public ResponseEntity<PostDto> getPostById(@PathVariable("pid") Integer id){
		PostDto postbyId = this.postService.getPostbyId(id);
		return new ResponseEntity<PostDto>(postbyId , HttpStatus.OK);
	}
	
	//update post
	@PutMapping("/post/{pid}")
	public ResponseEntity<PostDto> updatePostController(@RequestBody PostDto postDto , @PathVariable("pid") Integer pid ){
		PostDto updatePost = this.postService.updatePost(postDto, pid);
		return new ResponseEntity<PostDto>(updatePost , HttpStatus.OK);
	}
	
	
	//@PreAuthorize("hasRole('ADMIN')")
	
	//delete post
	@DeleteMapping("post/{pid}")
	public ResponseEntity<ApiResponse> deletePostController(@PathVariable("pid") Integer pid){
		this.postService.deletePost(pid);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Post Deleted Successfully" , true) , HttpStatus.OK);
	}
	
	//search
	@GetMapping("post/search/{keyword}")
	public ResponseEntity<List<PostDto>> searchPostController(@PathVariable("keyword") String keyword){
		List<PostDto> posts = this.postService.searchPost(keyword);
	    return new ResponseEntity<List<PostDto>>(posts , HttpStatus.OK);
	}
	
	//upload image
	@PostMapping("post/upload/{postId}")
	public ResponseEntity<PostDto> uploadPostController(
			@PathVariable("postId") Integer postId,
			@RequestParam("image") MultipartFile image
			) throws IOException{
		
		PostDto postDto = this.postService.getPostbyId(postId);
		String filename = fileService.uploadImage(path, image);
		
		
		postDto.setImage(filename);
		PostDto updatePost = this.postService.updatePost(postDto, postId);
	    return new ResponseEntity<PostDto>(updatePost , HttpStatus.OK);
	
	}
	
	//serve image
	@GetMapping("image/{imageName}")
	public void viewImage(
			@PathVariable("imageName") String imageName,
			HttpServletResponse response
			) throws IOException {
		InputStream is =  this.fileService.getImaageResource(path, imageName);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(is, response.getOutputStream());
	}
	
	
	
	
	
	
}
