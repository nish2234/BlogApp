import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL2 } from '../Services/Helper';
import { getCurrentUser } from './auth';
import { postDelete } from '../Services/PostService';
import { toast } from 'react-toastify';







function BlogContent(props) {
 
   
const deletepost = ()=>{
  props.deletePost(props.postId);
}

  return (
    <Card elevation={6} sx={{ width: { xs: "80vw", md: "50vw" } , backgroundColor : "#E1E2E2" , marginBottom : "10px"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.user.username.substring(0, 1).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.user.username}
        subheader={props.date}
      />
      <CardMedia
        component="img"
        height="300"
        image={BASE_URL2+"/image/"+props.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction={"row"}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Stack>
        <Stack direction={"row"} spacing={2}>
         {
          getCurrentUser()?.user_id === props.user.user_id && 
          <Button variant="contained" color='error' sx = {{width: {xs : "30px"} , fontSize : {xs : "12px"}}} onClick={deletepost}>
           Delete
          </Button>
         }
        <Button variant="contained" sx={{backgroundColor: "black"}}>
          <Link className='link2' to={"/posts/" + props.postId}>Read More</Link>
        </Button>
        </Stack>
       
      </CardActions>
    </Card>
  );
}

export default BlogContent
