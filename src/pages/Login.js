import React, { useState } from "react";
import Base from "../component/Base";
import { Box, Button, Card,  CardContent,   TextField,  Typography } from "@mui/material";
import { toast } from "react-toastify";
import { login } from "../Services/UserService";
import { doLogin } from "../component/auth";
import { useNavigate } from "react-router-dom";
function Login() {

  const[loginDetail , setLoginDetail] = useState({
    username : '', 
    password : ''
  });

  const navigate = useNavigate();
    
  const handleChange = (e , property)=>{
      setLoginDetail({...loginDetail , [property] : e.target.value});
  }

  const handleSubmit=(e)=>{
          e.preventDefault();
          if(loginDetail.username.trim() === '' || loginDetail.password.trim() === ''){
            toast.error("Invalid Credential");
            return;
          }
          // submit to the server
          login(loginDetail).then((data)=>{
            if(data === "Credentials Invalid !!"){
              toast.error("Invalid login credentials");
              return;
            }
            //save to local storage
            doLogin(data , ()=>{
              //console.log("saved to local storage");
              navigate("/user/dashboard")

            })
            toast.success("Logged in successfully");
            //console.log(data);
          }).catch((error)=>{
            console.log(error);
            toast.error("Invalid login credentials");
          })
          //console.log(loginDetail);
  }
  return (
    <>
      <Base />
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <Card
          sx={{
            width: { xs: "350px", md: "600px" },
            minWidth: 100,
            marginTop: "10px",
            height: 350,
            backgroundColor:"#E1E2E2"
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
              LOGIN
            </Typography>

            {/* username */}
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              sx={{ width: { xs: "300px", md: "550px" }, marginTop: "20px" }}
              value={loginDetail.username}
              onChange={(e)=>handleChange(e , "username")}
            />

            {/* password */}
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              sx={{ width: { xs: "300px", md: "550px" }, marginTop: "20px" }}
              value={loginDetail.password}
              onChange={(e)=>handleChange(e , "password")}
            />
            
           

            <Button
              variant="contained"
              sx={{
                width: { xs: "300px", md: "550px" },
                marginTop: "20px",
                backgroundColor: "#FB8122",
              }}
              onClick={(e)=>handleSubmit(e)}
            >
              LOGIN
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default Login;
