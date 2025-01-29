import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../config/axiosConfig.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      axiosInstance
        .post("users/signin", values)
        .then((response) => {
          console.log(response.data);
          // Save user details in localStorage, including profile photo
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("firstName", response.data.firstName);
          localStorage.setItem("lastName", response.data.lastName);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("phoneNumber", response.data.phoneNumber);
          localStorage.setItem("speciality", response.data.speciality);
          localStorage.setItem("profilePhoto", response.data.profilePhoto);  // Add profile photo here
          window.location.href = "/dashboard";
        })
        .catch((error) => {
          console.log(error.response);
          toast.error(error.response.data.message);
        });
    },
  });

  if (localStorage.getItem("token")) {
    axios
      .get("users/verifyToken", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then(() => {
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.log(error.response);
        localStorage.removeItem("token");
      });
  }

  return (
    <div className="h-screen w-screen flex relative">
      <ToastContainer />
      <div
        className="flex items-center gap-5 p-4 absolute cursor-pointer"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <img src="icowhite.svg" className="w-1/3" alt="" />
        <h1 className="text-3xl text-white font-racingSansOne">
          Health Management System 2024
        </h1>
      </div>
      <div className="w-full bg-secondary flex justify-center items-center rounded-tr-3xl">
        <img
          src="images/doctorCheking.png"
          alt="illustration"
          className="w-7/12"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-11/12">
        <div className="rounded-xl w-[27rem]">
          <h2 className="text-3xl font-semibold mb-5 text-center">
            Welcome to
          </h2>
          <h2 className="text-3xl mb-5 text-center font-racingSansOne text-secondary">
            Health Management System 2024
          </h2>
          <h2 className="text-3xl font-semibold mb-5 text-center">Sign In</h2>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="username">Email Address</label>
              <div className="relative mt-2">
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  className={`border rounded-md p-5 h-9 w-full ${
                    formik.touched.username &&
                    formik.errors.username &&
                    "border-red-500"
                  }`}
                  placeholder="Enter your email or username"
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500">{formik.errors.username}</div>
              )}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`border rounded-md p-5 h-9 w-full ${
                    formik.touched.password &&
                    formik.errors.password &&
                    "border-red-500"
                  }`}
                  placeholder="Enter your password"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 text-xl"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="bg-secondary text-white font-bold mt-5 p-3 rounded-md hover:bg-secondary/80 transition duration-300 ease-in-out"
            >
              Log In
            </button>

            <a
              href="/forgetpassword"
              className="text-black text-xs font-semibold mt-3 block text-center hover:text-secondary"
            >
              Forgot your password?
            </a>
          </form>
          <div>
            <div className="flex justify-center mt-3">
              <p className="text-xm">
                Don't have an account?
                <span
                  onClick={() => {
                    window.location.href = "/signup";
                  }}
                  className="ml-3 font-semibold underline text-black transition duration-300 ease-in-out w-full cursor-pointer hover:text-secondary"
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
