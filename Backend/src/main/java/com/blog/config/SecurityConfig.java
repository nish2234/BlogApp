package com.blog.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.blog.security.CustomUserDetailService;
import com.blog.security.JWTAuthenticationEntryPoint;
import com.blog.security.JWTAuthenticationFilter;



@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@EnableWebMvc
public class SecurityConfig{
	
    @Autowired
    private JWTAuthenticationEntryPoint point;
    @Autowired
    private JWTAuthenticationFilter filter;
    
    public static final String[] PUBLIC_URLS = {"/auth/**" , 
    		            "/v3/api-docs" ,
    		            "/v2/api-docs" , 
    		            "/swagger-resources/**",
    		            "/swagger-ui/**",
    		            "/webjars/**"
    };
     
    @Bean
    
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf(csrf -> csrf.disable()).authorizeHttpRequests(
        		 auth -> auth.requestMatchers(PUBLIC_URLS).permitAll()
        		.requestMatchers(HttpMethod.GET , "/api/**").permitAll()
        		.requestMatchers("/api/**").authenticated())
                .exceptionHandling(ex -> ex.authenticationEntryPoint(point))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        
               http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
                
           
        return http.build();
    }
    
	@Autowired
	private CustomUserDetailService customUserDetailService;
	
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		
		auth.userDetailsService(customUserDetailService).passwordEncoder(passwordEncoder());
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	 @Bean
	    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
	        return builder.getAuthenticationManager();
	 }
	 
	 @Bean
	 public FilterRegistrationBean coresFilter() {
		 UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		 
		 CorsConfiguration corsConfiguration = new CorsConfiguration();
		 corsConfiguration.setAllowCredentials(true);
		 corsConfiguration.addAllowedOriginPattern("*");
		 corsConfiguration.addAllowedHeader("Authorization");
		 corsConfiguration.addAllowedHeader("Content-Type");
		 corsConfiguration.addAllowedHeader("Accept");
		 corsConfiguration.addAllowedMethod("POST");
		 corsConfiguration.addAllowedMethod("GET");
		 corsConfiguration.addAllowedMethod("DELETE");
		 corsConfiguration.addAllowedMethod("PUT");
		 corsConfiguration.addAllowedMethod("OPTIONS");
		 corsConfiguration.setMaxAge(3600L);
		 
		 source.registerCorsConfiguration("/**", corsConfiguration);
		 
		 FilterRegistrationBean bean = new FilterRegistrationBean<>(new CorsFilter(source));
		 
		 bean.setOrder(-110);
		 return bean;
		 
		 
	 }
	


}
