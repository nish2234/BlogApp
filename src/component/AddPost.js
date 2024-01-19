import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { loadAllCategory } from "../Services/CategoryService";
import JoditEditor from "jodit-react";
import { createPost, postImage } from "../Services/PostService";
import { toast } from "react-toastify";
import { getCurrentUser } from "./auth";

function AddPost() {
  // loading categories
  const [category, setCategory] = useState([]);
  useEffect(() => {
    loadAllCategory()
      .then((data) => {
        //console.log(data);
        setCategory(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //onchanging setting the values

  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  const editor = useRef(null);
  const handleChange = (event, property) => {
    setPost({ ...post, [property]: event.target.value });
  };
  const joditChange = (data) => {
    setPost({ ...post, content: data });
  };

  const handleReset = () => {
    setPost({
      title: "",
      content: "",
      categoryId: "",
    });
    setBtntext("upload file")
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validations
    if (post.title.trim === "") {
      alert("Post title should not be blank");
      return;
    }
    if (post.content.trim === "") {
      alert("Post content should not be blank");
      return;
    }
    if (post.categoryId.trim === "") {
      alert("Category should not be blank");
      return;
    }

    //post on server
    post["userId"] = getCurrentUser().user_id;
    createPost(post)
      .then((data) => {
        
        
        postImage(image , data.pid).then((d)=>{
          //console.log(data);
          toast.success("Image uploaded");
        }).catch((e)=>console.log(e));

        toast.success("Posted Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occurred");
      });
  };

  const [btnText, setBtntext] = useState("Upload Image");
  const [image , setImage] = useState(null);

  const handleImageChange =(e)=>{
    setImage(e.target.files[0]);
    setBtntext("File Selected");
  }

  return (
    <>
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
              CREATE A NEW POST
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
                value={post.title}
                onChange={(e) => handleChange(e, "title")}
              />

              {/* content  */}
              <JoditEditor
                ref={editor}
                value={post.content}
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
                  value={post.categoryId}
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
                Create Post
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
  );
}

export default AddPost;
