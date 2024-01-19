
import { getToken } from "../component/auth";
import {mainAxios, privateAxios } from "./Helper";

//create post
export const createPost = (postData)=>{
      
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/post` , postData , 
    { headers : {
        Authorization : `Bearer ${getToken()}` , 
}}
    ).then((response) =>{
        return response.data;
    })
}

// get all post

export const getAllPost = (pageNumber , pageSize)=>{
    return mainAxios.get(`/post?pageNumber=${pageNumber}&pageSize=${pageSize}`).then((response) => response.data);
}

//load single post by id
export const getPostById = (pid)=>{
    return mainAxios.get(`/post/${pid}`).then((response) => response.data);
}

//post image
export const postImage = (image , postId)=>{
    
    let formData = new FormData();
    formData.append("image" , image);
    return privateAxios.post(`/post/upload/${postId}` , formData , { headers : {
        Authorization : `Bearer ${getToken()}` , 
        "Content-Type" : "multipart/form-data"
    }}).then((response)=>{
        return response.data;
    })
}
// delete post
export const postDelete = (postId)=>{
      
    return privateAxios.delete(`/post/${postId}` , 
    { headers : {
        Authorization : `Bearer ${getToken()}` , 
}}
    ).then((response) =>{
        return response.data;
    })
}

//update post


export const updatePost = (postData , postId)=>{
      
    return privateAxios.put(`/post/${postId}` , postData , 
    { headers : {
        Authorization : `Bearer ${getToken()}` , 
}}
    ).then((response) =>{
        return response.data;
    })
}
