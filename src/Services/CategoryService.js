import { myAxios } from "./Helper";

export const loadAllCategory = ()=>{
    return myAxios.get('/api/categories/').then((response)=>{
        return response.data
    })
}

// load all post with category
export const loadAllpostCategory = (categoryId)=>{
    return myAxios.get(`/api/category/${categoryId}/post`).then((response)=>{
        return response.data
    })
}
