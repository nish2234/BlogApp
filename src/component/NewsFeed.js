import React, { useEffect, useState } from 'react'
import { getAllPost, postDelete } from '../Services/PostService';
import { Pagination, Stack } from '@mui/material';
import BlogContent from './BlogContent';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';

function NewsFeed() {
      
    const [postContent , setPostContent] = useState(
      {
        last : "" , 
        pageNumber : "" , 
        pageSize : "" , 
        posts : [] , 
        totalPages : "" , 
        totalPosts : "" 

      }
    );
    const[pageNumber , setPagenumber] = useState(0);
    const changePage=(pageNumber=0 , pageSize=5)=>{
     getAllPost(pageNumber , pageSize).then((response)=>{
        //console.log(response);
        setPostContent({
          last : response.last , 
          pageNumber : response.pageNumber , 
          pageSize : response.pageSize , 
          posts : [...postContent.posts , ...response.posts] ,
          totalPages : response.totalPages , 
          totalPosts : response.totalPosts 
        });
        //window.scrollTo(0,0);pagination me use kiya tha
        
    }).catch((error)=>{
        console.log(error);
    })
    }
    
    useEffect(()=>{
       
        //load all post from the server
        
        changePage(pageNumber);

        
    }, [pageNumber]);

    // const handlechange = (event , value)=>{
    //   changePage(value-1);
    // }
    const changePageInfinite = ()=>{
          setPagenumber(pageNumber+1);
    }

    const deletePost = (postId)=>{
      postDelete(postId).then((data)=>{
      
          let newcontent = postContent.posts.filter(p => postId != p.pid);
          setPostContent({...postContent , posts : newcontent});
          toast.success("Post deleted successfully");
        
      }).catch((err)=>{
        console.log(err);
      })
      
  }

  return (
    <Stack 
    direction={'column'}
    justifyContent={"center"}
    alignItems={"center"}
    spacing={2}
    
    >

      <InfiniteScroll
       dataLength={postContent ? postContent?.posts.length : 0}
       next={changePageInfinite}
       hasMore={!postContent?.last}
      >
         
      {
        postContent?.posts?.map((post)=>{
          var d = new Date(post.date);
          var x = d.toDateString();
          return <BlogContent key={post.pid} title={post.title} content = {post.content} date={x} user = {post.user} postId = {post.pid} image={post.image} deletePost={deletePost}/>
          
        })
      }

      </InfiniteScroll>
      
      

      {/* Pagination hatake , implementing Infinite scroll */}
      {/* <Pagination size= 'medium' onChange={handlechange} count={postContent?.totalPages} color="primary" /> */}
       
      

    </Stack>
  )
}

export default NewsFeed
