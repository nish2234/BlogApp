import { getToken } from "../component/auth";
import { privateAxios } from "./Helper";

export const commentAdd = (postId , data)=>{
    return privateAxios.post(`/comment/${postId}` , data 
     , { headers : {
        Authorization : `Bearer ${getToken()}` , 
}}).then((response) =>{
        return response.data;
    })
}