import React, { useEffect, useState } from 'react'
import Base from '../component/Base'
import { Box, Card, CardContent, Container, MenuItem, Typography } from '@mui/material'
import { getCurrentUser } from '../component/auth'
import image from '../component/auth/profile.jpg'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
function Profile() {

  const [user , setUser] = useState(null);
  useEffect(()=>{
    setUser(getCurrentUser());
  } , []);
  
  getCurrentUser()

  return (
    <>
    <Base/>
     <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
     <Card sx={{width : {xs : "90vw" , md : "50vw"}}}>
       <CardContent sx={{display:"flex" , justifyContent:"center" , alignItems:"center", flexDirection:"column"}}>
        <Box sx={{display:"flex" , justifyContent:"center"}}>
          <img src={image} alt="" width={"50%"}/>
        </Box>
        <Grid width={{xs:"80vw" , md:"50vw"}} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6} md={6} sx={{backgroundColor:"#FB8122"}}>
          <MenuItem>
             Username  
          </MenuItem>
        </Grid>
        <Grid xs={6} md={6} sx={{backgroundColor:"#FB8122"}}>
        <Container maxWidth={"30vw"}>
          {user?.username} 
        </Container>
        </Grid>
        <Grid xs={6} md={6} sx={{backgroundColor:"#FB8122"}}>
        <MenuItem>
          Email
        </MenuItem>
        </Grid>
        <Grid xs={6} md={6} sx={{backgroundColor:"#FB8122"}}>
        <Container maxWidth={"30vw"}>
          {user?.email}
        </Container>
        </Grid>
        <Grid xs={6} md={6} sx={{backgroundColor:"#FB8122"}}>
         <MenuItem>
         About
         </MenuItem>
        </Grid>
        <Grid xs={6} md={6}  sx={{backgroundColor:"#FB8122"}}>
         
         <Container maxWidth={"30vw"}>
            {user?.about}
         </Container>
         
        </Grid>
      </Grid>
       </CardContent>
      
    </Card>
     </Box>
    </>
  )
}

export default Profile
