import React, { useEffect, useState } from 'react'
import Base from "../component/Base"
import { useNavigate, useParams } from 'react-router-dom'
import { getPostById } from '../Services/PostService';
import { Avatar,  Button,  Card,  CardActions,  CardContent, CardHeader, CardMedia, Container, IconButton, TextField, Typography } from '@mui/material'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { commentAdd } from '../Services/CommentService';
import { toast } from 'react-toastify';
import { getCurrentUser, isLoggedIn } from '../component/auth';
import { BASE_URL2 } from '../Services/Helper';
function ReadMore() {

    const{postId} = useParams();
    const navigate = useNavigate();
    const[post , setPost] = useState(null);
    const loadPost = ()=>{
      getPostById(postId).then((data)=>{
        //console.log(data);
        setPost(data);
      }).catch((error)=>{
        console.log(error);
      })
    }
    useEffect(()=>{
      // load post using postId
      loadPost();
    } , [postId]);

    const[comment , setComment] = useState({
      content : ""
    });
    const handlechange = (e)=>{
      setComment({...comment , content : e.target.value});
    }
    const addcomment = ()=>{
      if(!isLoggedIn()){
        toast.error("Need to login first");
      }
          commentAdd(postId , comment).then((data)=>{
            //console.log(data);
            toast.success("Comment added successfully");
            setComment({
              content : ""
            })
            loadPost();

          }).catch((error)=>{
            console.log(error);
          })
    }

    const updatePost = ()=>{
           navigate("/user/update/"+postId);
    }
    
  return (
    <>
    <Base/>
    <Container sx={{display :"flex" , justifyContent : " center" , alignItems : " center", flexDirection: 'column' , gap : "10px" , marginTop : '30px'}}>
        
    <Card elevation={6} sx={{ width: { xs: "80vw", md: "70vw" } , backgroundColor : "#E1E2E2" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post?.user.username.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post?.user.username}
        subheader={new Date(post?.date).toDateString()}
      />
      {/* <CardMedia
        component="img"
        height="300"
        image={BASE_URL2+"/image/"+post?.image}
        // for testing
        //image={"https://picsum.photos/id/"+postId+"/800/800"}
        alt="https://picsum.photos/"
      /> */}
      <CardContent>
        <img src={BASE_URL2+"/image/"+post?.image} width={"75%"} alt="" />
        <Typography gutterBottom variant="h5" component="div">
          {post?.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">Category - {post?.category.categoryTitle}</Typography>

        <Typography  paragraph dangerouslySetInnerHTML = {{__html : post?.content}}>
          
        </Typography>
      </CardContent>

      <CardActions>
       {
        getCurrentUser()?.user_id === post?.user.user_id &&  
        <Button variant='contained' color='warning' onClick={updatePost}>
        Update Post
       </Button>
       }
      </CardActions>
      
    </Card>

    <Card elevation={6} sx={{ width: { xs: "80vw", md: "70vw" }  , backgroundColor : "#E1E2E2"}}>

     <CardContent>
     <Typography gutterBottom variant="h5" component="div">
          Comments({post?.comments.length})
     </Typography>
     {
      post?.comments.map((comment)=>{
        return <Typography key={comment.comment_id} variant="body2" color="text.primary" sx={{marginLeft : '10px' , marginTop : "5px"}}>- {comment.content}</Typography>
      })
     }

    <TextField
      id="filled-multiline-static"
      label="Add a Comment"
      multiline
      rows={4}
      sx={{ width: { xs: "70vw", md: "67vw" }, marginTop: "20px" }}
      onChange={(e)=>handlechange(e)}
      value={comment.content}
      />

        <Button variant="contained" onClick={addcomment} sx={{backgroundColor: "black" , marginTop: "20px"}}>
          Add Comment
        </Button>
    </CardContent>  
    </Card>


    </Container>
    

    </>
  )
}

export default ReadMore
