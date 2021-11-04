import axios from 'axios'

export const login_axios = ({username, password}) => {
    console.log(username, password);
    return axios.post('http://localhost:4000/api/auth/login', {username, password}, {withCredentials: true});
}

export const register_axios=({username, password})=>{
    console.log(username, password);
    return axios.post('http://localhost:4000/api/auth/register', {username, password}, {withCredentials:true});
}
