import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL:"https://hms-mongodb-x9kq.vercel.app", // ✅ Uses env variable for flexibility
  headers: {
    ...(token && { "x-access-token": token }), // ✅ Only include token if it exists
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Allows cookies and auth credentials
});

export default axiosInstance;
