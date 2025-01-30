import axios from 'axios';
const token = localStorage.getItem('token'); 

const axiosInstance = axios.create({
  baseURL: 'https://hms-mongodb-i4y6.vercel.app',
  // other config options if needed
  headers: { "x-access-token": token, "Content-Type": "application/json" },
});

export default axiosInstance;