import React from 'react'
import Base from '../component/Base'
import NewsFeed from '../component/NewsFeed'
import { Container, Stack } from '@mui/material'
import CategoryMenu from '../component/CategoryMenu'
function Home() {
 

 
  return (
   <>
   <Base/>
   <Container sx={{marginTop : '20px' , marginBottom:'20px' , display : 'flex' , gap : 10 , justifyContent : {xs : "center" , md : "space-between"}}}>
    
    <CategoryMenu />
    <NewsFeed/>
    
   
   </Container>
   
   
   </>
    
   
  )
}

export default Home
