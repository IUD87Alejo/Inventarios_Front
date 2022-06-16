import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL:'http://localhost:9000/api/'
    baseURL:'https://inventariobackend.herokuapp.com/api/'
    
});

export {
    axiosInstance
}