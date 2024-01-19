import axios from "axios"
export const BASE_URL = "http://localhost:8080"
export const BASE_URL2 = "http://localhost:8080/api"
export const myAxios = axios.create({
    baseURL:BASE_URL
});

export const mainAxios = axios.create({
    baseURL:BASE_URL2
});


export const privateAxios = axios.create({
    baseURL:BASE_URL2
    
    
});
