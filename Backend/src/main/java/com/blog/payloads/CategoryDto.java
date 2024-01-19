package com.blog.payloads;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter

public class CategoryDto {
	
	
	private Integer categoryId;
	
	@NotBlank(message = "Title of category should not be blank")
	private String categoryTitle;
	
	@NotBlank(message = "Description of category should not be blank")
	private String categoryDesc;
}
