import { myAxios } from "./Helper";

export const signUp = (user) => {
  return  myAxios.post("/auth/register",user)
  .then((response) => response.data);
  
};


export const login = (loginDetail) => {
  return  myAxios.post("/auth/login",loginDetail)
  .then((response) => {
    return response.data;
  });
  
};
