package com.blog.exception;

public class ResourceNotFoundException extends RuntimeException {
   String resourcenameString;
   String resourceField;
   long id;
public ResourceNotFoundException(String resourcenameString, String resourceField, long id) {
	super(String.format("%s not found with %s : %s", resourcenameString , resourceField , id));
	this.resourcenameString = resourcenameString;
	this.resourceField = resourceField;
	this.id = id;
}
   
   
}
