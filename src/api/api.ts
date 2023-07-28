import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {'API-KEY': 'e6a8a7ef-5858-4ade-a6e6-925e2ca655c7'}
})