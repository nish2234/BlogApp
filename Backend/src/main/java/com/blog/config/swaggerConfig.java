package com.blog.config;

import org.springframework.context.annotation.Bean;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;


public class swaggerConfig {
	  @Bean
	  public OpenAPI springShopOpenAPI() {
	      return new OpenAPI()
	              .info(new Info().title("SpringShop API")
	              .description("Spring shop sample application")
	              .version("v0.0.1")
	              );
	  }
}
