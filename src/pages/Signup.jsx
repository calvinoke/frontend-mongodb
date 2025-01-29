import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosConfig.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.number("Invalid phone number").required(
      "Phone number is required"
    ),
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
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("username", values.username);
      formData.append("specialty", values.specialty);
      formData.append("password", values.password);

      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      axiosInstance
        .post("/users/signup", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("firstName", response.data.firstName);
          localStorage.setItem("lastName", response.data.lastName);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("phoneNumber", response.data.phoneNumber);
          localStorage.setItem("specialty", response.data.specialty);
          localStorage.setItem("profilePhoto", response.data.profilePhoto);
          navigate("/signin", { replace: true });
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "Something went wrong!");
        });
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

  //event handler for handling photo change...
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Unsupported file type. Please upload a JPEG, PNG, or GIF image.");
        return;
      }
      setProfilePhoto(file);
    }
  };

  return (
    <div className="h-screen w-screen flex relative">
      <ToastContainer />
      <div
        className="flex items-center gap-5 p-4 absolute cursor-pointer"
        onClick={() => {
          window.location.href = "/";
        }}
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
          <h2 className="text-3xl font-semibold mb-5 text-center">
            Welcome to
          </h2>
          <h2 className="text-3xl mb-5 text-center font-racingSansOne text-secondary">
            Health Management System
          </h2>
          <h2 className="text-3xl font-semibold mb-5 text-center">
            Create an Account
          </h2>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            <div className="flex gap-10">
              <InputField formik={formik} name="firstName" label="First Name" />
              <InputField formik={formik} name="lastName" label="Last Name" />
            </div>
            <InputField formik={formik} name="email" label="Email Address" />
            <div className="flex gap-10">
              <InputField formik={formik} name="phoneNumber" label="Phone Number" />
              <div>
                <label htmlFor="specialty" className="text-sm">
                  Specialty
                </label>
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
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-10">
              <InputField formik={formik} name="username" label="Username" />
              <InputField formik={formik} name="password" label="Password" type="password" withToggle />
            </div>
            <div>
              <label htmlFor="profilePhoto" className="text-sm">
                Profile Photo
              </label>
              <input
                type="file"
                name="profilePhoto"
                id="profilePhoto"
                onChange={handleProfilePhotoChange}
                className="mt-2 border border-gray-400 rounded-md p-2 w-full"
              />
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
                onClick={() => {
                  window.location.href = "/signin";
                }}
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
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
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
          className="absolute right-2 top-8 text-gray-500"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      )}
    </div>
  );
};

export default Signup;
