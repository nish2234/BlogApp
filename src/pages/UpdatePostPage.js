import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Base from "../component/Base"
import { Button, Card, CardContent, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import JoditEditor from 'jodit-react';
import { loadAllCategory } from '../Services/CategoryService';
import { getCurrentUser } from '../component/auth';
import { createPost, getPostById, postImage, updatePost } from '../Services/PostService';
import { toast } from 'react-toastify';
function UpdatePostPage() {

  const {postId} = useParams();
  // loading categories
  const [category, setCategory] = useState([]);
  const [newpost , setnewpost] = useState({
    title: "",
    content: "",
    categoryId: "",
    image : ""
  })
  useEffect(() => {
    loadAllCategory()
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
        console.log(error);
      });
      
      //loading post by id
      getPostById(postId).then((data)=>{
        //console.log(data);
        setnewpost({
            title: data.title,
            content: data.content,
            categoryId: data.category.categoryId,
            image : data.image
        })
      }).catch((error)=>{
        console.log(error);
      })


  }, []);

  //onchanging setting the values

  const editor = useRef(null);
  const handleChange = (event, property) => {
    setnewpost({ ...newpost, [property]: event.target.value });
  };
  const joditChange = (data) => {
    setnewpost({ ...newpost, content: data });
  };

  const handleReset = () => {
    setnewpost({
      title: "",
      content: "",
      categoryId: "",
    });
  };
  const [btnText, setBtntext] = useState("Upload Image");
  const [image , setImage] = useState(null);

  const handleImageChange =(e)=>{
    setImage(e.target.files[0]);
    setBtntext("File Selected");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // validations
    if (newpost.title.trim === "") {
      alert("Post title should not be blank");
      return;
    }
    if (newpost.content.trim === "") {
      alert("Post content should not be blank");
      return;
    }
    if (newpost.categoryId.trim === "") {
      alert("Category should not be blank");
      return;
    }

    //update on server
    updatePost(newpost , postId).then((data)=>{
        //console.log(data);
        if(image !== null){
            postImage(image , postId).then((d)=>{
                //console.log(data);
                toast.success("Image uploaded");
              }).catch((e)=>console.log(e));
        }
    }).catch((err)=>{
        console.log(err);
    })
  };

 
  return (
    <>
    
    <Base/>

 
      <Container sx={{ marginTop: "30px" }}>
        <Card elevation={6} sx={{backgroundColor : "#E1E2E2"}}>
          <CardContent>
            <Typography
              sx={{
                fontSize: "25px",
                fontFamily: "monospace",
                letterSpacing: "1px",
              }}
              fontWeight={600}
            >
              UPDATE POST
            </Typography>

            <Stack
              direction={"column"}
              alignItems={"stretch"}
              spacing={2}
              sx={{ marginTop: "15px" }}
            >
              {/* title  */}
              <TextField
                id="outlined-basic"
                label="Post Title"
                variant="outlined"
                value={newpost.title}
                onChange={(e) => handleChange(e, "title")}
              />

              {/* content  */}
              <JoditEditor
                ref={editor}
                value={newpost.content}
                onChange={joditChange}
              />

              {/* file upload */}
              <Button variant="contained" component="label">
                {btnText}
                <input type="file" hidden onChange={(e)=>handleImageChange(e)} />
              </Button>

              {/* category */}

              <FormControl>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Category"
                  onChange={(e) => handleChange(e, "categoryId")}
                  value={newpost.categoryId}
                >
                  {category.map((cat) => (
                    <MenuItem key={cat.categoryId} value={cat.categoryId}>
                      {cat.categoryTitle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={3}
              sx={{ marginTop: "20px" }}
            >
              <Button
                variant="contained"
                sx={{
                  width: { xs: "350px", md: "350px" },
                  marginTop: "20px",
                  backgroundColor: "black",
                }}
                onClick={handleSubmit}
              >
                Update Post
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: { xs: "350px", md: "350px" },
                  marginTop: "20px",
                  backgroundColor: "black",
                }}
                onClick={handleReset}
              >
                Reset
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default UpdatePostPage
