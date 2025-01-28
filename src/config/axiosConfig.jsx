import axios from 'axios';
const token = localStorage.getItem('token'); //

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  // other config options if needed
  headers: { "x-access-token": token, "Content-Type": "application/json" },
});

export default axiosInstance;