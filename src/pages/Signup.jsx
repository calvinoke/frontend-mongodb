import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10,15}$/, "Invalid phone number")
      .required("Phone number is required"),
    username: Yup.string().required("Username is required"),
    specialty: Yup.string().required("Specialty is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      username: "",
      specialty: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/users/signup", values);
        const { accessToken, firstName, lastName, username, email, phoneNumber, specialty } = response.data;
        
        localStorage.setItem("token", accessToken);
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("phoneNumber", phoneNumber);
        localStorage.setItem("specialty", specialty);
        
        navigate("/signin", { replace: true });
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    },
  });

  const specialties = [
    "generalPractitioner",
    "surgeon",
    "gynecologist",
    "cardiologist",
    "dermatologist",
    "pediatrician",
    "neurologist",
    "radiologist",
    "other",
  ];

  return (
    <div className="h-screen w-screen flex relative">
      <ToastContainer />
      <div
        className="flex items-center gap-5 p-4 absolute cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="icowhite.svg" className="w-1/3" alt="Health Management System logo" />
        <h1 className="text-3xl text-white font-racingSansOne">
          Health Management System
        </h1>
      </div>
      <div className="w-full bg-secondary flex justify-center items-center rounded-tr-3xl">
        <img src="images/doctorShakingHand.png" alt="Doctor shaking hands with a patient" className="w-7/12" />
      </div>
      <div className="flex flex-col items-center justify-center w-11/12">
        <div className="rounded-xl w-[32rem]">
          <h2 className="text-3xl font-semibold mb-5 text-center">Create an Account</h2>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            <div className="flex gap-10">
              <InputField formik={formik} name="firstName" label="First Name" />
              <InputField formik={formik} name="lastName" label="Last Name" />
            </div>
            <InputField formik={formik} name="email" label="Email Address" />
            <div className="flex gap-10">
              <InputField formik={formik} name="phoneNumber" label="Phone Number" />
              <div>
                <label htmlFor="specialty" className="text-sm">Specialty</label>
                <select
                  id="specialty"
                  name="specialty"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.specialty}
                  className="mt-2 border border-gray-400 rounded-md p-2 h-9 w-full"
                >
                  <option value="" label="Select your specialty" />
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-10">
              <InputField formik={formik} name="username" label="Username" />
              <InputField formik={formik} name="password" label="Password" type="password" withToggle />
            </div>
            <button
              type="submit"
              className="bg-secondary text-white font-bold mt-5 p-3 rounded-md hover:bg-secondary/80 transition duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </form>
          <div className="flex justify-center mt-3">
            <p className="text-xm">
              Already have an account?
              <span
                onClick={() => navigate("/signin")}
                className="ml-3 font-semibold underline text-secondary transition duration-300 ease-in-out w-full cursor-pointer hover:text-secondary/80"
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ formik, name, label, type = "text", withToggle = false }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label htmlFor={name} className="text-sm">{label}</label>
      <input
        type={withToggle ? (showPassword ? "text" : "password") : type}
        name={name}
        id={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="mt-2 border border-gray-400 rounded-md p-5 h-9 w-full"
      />
      {withToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      )}
    </div>
  );
};

export default Signup;
