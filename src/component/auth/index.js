//isloggedin or not
export const isLoggedIn = ()=>{
    let data = localStorage.getItem("data");
    if(data === null){
        return false;
    }
    else{
        return true;
    }
}

//doLogin
export const doLogin = (data , next)=>{
     localStorage.setItem("data" , JSON.stringify(data));
     next();
}


//doLogout
export const doLogOut = (next)=>{
    localStorage.removeItem("data");
    next();
}

//get current user details
export const getCurrentUser = ()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data"))?.userDto;
    }
    else{
        return undefined;
    }
}

//getToken
export const getToken = ()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data"))?.token;
    }
    else{
        return null;
    }
}
