import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BlogContent from '../component/BlogContent';
import { useParams } from 'react-router-dom';
import { loadAllpostCategory } from '../Services/CategoryService';
import { postDelete } from '../Services/PostService';
import { toast } from 'react-toastify';

function CtegoryPostPage() {

  
const {categoryId} = useParams();
const [post , setpost] = useState([]);
useEffect(()=>{
   loadAllpostCategory(categoryId).then((data)=>{
    //console.log(data);
    setpost(data);
   }).catch((err)=>{
    console.log(err);
   })
} , [categoryId])

const deletePost = (postId)=>{
  postDelete(postId).then((data)=>{
  
      let newcontent = post.filter(p => postId != p.pid);
      setpost(newcontent);
      toast.success("Post deleted successfully");
    
  }).catch((err)=>{
    console.log(err);
  })
  
}


  return (
    <>
     <Stack 
    direction={'column'}
    justifyContent={"center"}
    alignItems={"center"}
    spacing={2}
    >

     {
        post.map((p)=>{
          var d = new Date(p.date);
          var x = d.toDateString();
          return <BlogContent key={p.pid} title={p.title} content = {p.content} date={x} user = {p.user} postId = {p.pid} image={p.image} deletePost={deletePost}/>
          
        })
      }

    </Stack>
    </>
  )
}

export default CtegoryPostPage
