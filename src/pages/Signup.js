import React, {  useState } from "react";
import Base from "../component/Base";
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { signUp } from "../Services/UserService";
function Signup() {
 

  const [data , setData] = useState({
    username : '',
    email : '',
    password : '',
    about : ''
  });

  const [error , setError] = useState({
    errors : {} , 
    isError : false
  });
  

  // handlechange
  const handleChange = (e , property)=>{
      // [] lagake we are changing the property string dynamically
      setData({...data , [property] : e.target.value});
  }

  //submit form
  const submit=(e)=>{
      e.preventDefault();
      //console.log(data);

      //data validation

      //calling server api (then success pe show krta else if there is an error to catch pe show hoga)
      signUp(data).then((resp)=>{
        //console.log(resp);
        toast.success("Registered Successfully!");
        setError({
          errors:{} , 
          isError:false
        });
        setData({
          username : '',
          email : '',
          password : '',
          about : ''
        });
        //console.log("successs");
      }).catch((error)=>{
        console.log(error);
       // console.log("error");
        setError({
          errors : error , 
          isError : true
        });
        toast.error("Invalid form");
      })
  }


  return (
    <>
      <Base />
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Card
          sx={{
            width: { xs: "400px", md: "600px" },
            minWidth: 100,
            marginTop: "10px",
            height: 590 , 
            backgroundColor: "#E1E2E2"
          }}
          elevation={6}
        >
          <CardContent>
            <Typography
              sx={{
                fontSize: "25px",
                fontFamily: "monospace",
                letterSpacing: "2px",
              }}
              fontWeight={600}
            >
              REGISTER/SIGNUP
            </Typography>
            <form >
              {/* Email */}
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              onChange={(e)=>handleChange(e , 'email')}
              value={data.email} //two way data binding
              sx={{ width: { xs: "350px", md: "550px" }, marginTop: "20px" }}
              error={error.errors?.response?.data?.email ? true : false}
              helperText={error.errors?.response?.data?.email}
            />

            {/* Password */}
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e)=>handleChange(e , 'password')}
              value={data.password} //two way data binding
              sx={{ width: { xs: "350px", md: "550px" }, marginTop: "20px" }}
              error={error.errors?.response?.data?.password ? true : false}
              helperText={error.errors?.response?.data?.password}
            />

            {/* Username */}
            <TextField
              id="name"
              label="Username"
              variant="outlined"
              onChange={(e)=>handleChange(e , 'username')}
              value={data.username} //two way data binding
              sx={{ width: { xs: "350px", md: "550px" }, marginTop: "20px" }}
              error={error.errors?.response?.data?.username ? true : false}
              helperText={error.errors?.response?.data?.username}
            />

            {/* About */}
            <TextField
              id="filled-multiline-static"
              label="About"
              multiline
              rows={4}
              onChange={(e)=>handleChange(e , 'about')}
              value={data.about} //two way data binding
              sx={{ width: { xs: "350px", md: "550px" }, marginTop: "20px" }}
              error={error.errors?.response?.data?.username ? true : false}
              helperText={error.errors?.response?.data?.about}
            />

            <Button
              variant="contained"
              sx={{
                width: { xs: "350px", md: "550px" },
                marginTop: "20px",
                backgroundColor: "#FB8122",
              }}
              onClick={(e)=>submit(e)}
            >
              Register
            </Button>

            </form>

            
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default Signup;
