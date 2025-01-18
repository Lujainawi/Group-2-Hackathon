import axios from 'axios';
const apiUrl = import.meta.env.VITE_SERVER_API_URL  || "http://localhost:5000/api";

console.log('API Base URL:', apiUrl);
console.log('API URL from .env:', import.meta.env.VITE_SERVER_API_URL);


// Create an instance of Axios with default configurations
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
