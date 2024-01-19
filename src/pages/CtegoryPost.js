import React, { useEffect, useState } from 'react'
import Base from '../component/Base'
import CategoryMenu from '../component/CategoryMenu'
import { Container } from '@mui/material'
import CtegoryPostPage from './CtegoryPostPage'
import { useParams } from 'react-router-dom'
import { loadAllpostCategory } from '../Services/CategoryService'
function CtegoryPost() {
  



  return (
   <>
   <Base/>
   <Container sx={{marginTop : '20px' , marginBottom:'20px' , display : 'flex' , gap : 10 , justifyContent : {xs : "center" , md : "space-between"}}}>
    
    <CategoryMenu />
    <CtegoryPostPage/>
   
   </Container>
   
   </>
  )
}

export default CtegoryPost
