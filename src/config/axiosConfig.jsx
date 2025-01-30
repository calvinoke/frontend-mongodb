import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "https://hms-mongodb-i4y6.vercel.app",
  headers: {
    "x-access-token": token,
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Ensure this is set
});

export default axiosInstance;
