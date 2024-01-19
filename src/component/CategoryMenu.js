import { Card, CardContent, Divider, ListItemText, MenuItem, MenuList, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { loadAllCategory } from '../Services/CategoryService';
import { useNavigate } from 'react-router-dom';



function CategoryMenu() {

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
  
  const navigate = useNavigate();
  const changePage = (categoryId)=>{
      navigate("/category/post/"+categoryId);
  }
  

  

  return (
    <Card sx={{ width: 320, maxWidth: '100%' , height : "25%" , maxHeight: "75%" , display : {xs : "none"  , md : "block"} , backgroundColor : "#E1E2E2"}}>
    <CardContent>
        <Typography variant='h5'>
        Category
        </Typography>
    </CardContent>
    <MenuList>
        {
            category.map((cat)=>{
              return (
               <MenuItem key={cat.categoryId} onClick={()=>changePage(cat.categoryId)}  >

                 <ListItemText >{cat.categoryTitle}</ListItemText>
                   
              </MenuItem>

              )
            })
        }

      
    </MenuList>
  </Card>
  )
}

export default CategoryMenu
