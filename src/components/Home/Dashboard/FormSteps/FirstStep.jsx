import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const FirstStep = ({ formData, onNext }) => {
  const formik = useFormik({
    initialValues: {
      lastName: formData.lastName || "",
      firstName: formData.firstName || "",
      email: formData.email || "",
      phone: formData.phone || "",
      gender: formData.gender || "",
      birthDate: formData.birthDate || "",
      maritalStatus: formData.maritalStatus || "",
    },
    validationSchema: Yup.object({
      lastName: Yup.string().required("Last name is required"),
      firstName: Yup.string().required("First name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Phone number must be a number"),
      gender: Yup.string().required("Gender is required"),
      birthDate: Yup.string().required("Birthdate is required"),
      maritalStatus: Yup.string().required("Marital status is required"),
    }),
    onSubmit: (values) => {
      onNext(values);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-6 p-10 px-20 w-4/5 m-auto relative"
    >
      {/* Simplified alt text */}
      <img
        src="icons/step1.svg"
        alt="Step 1 form illustration"
        className="w-2/5 right-[20rem] absolute top-[-2rem]"
      />
      <div className="flex gap-10 items-center justify-start">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="lastName"
            className={`${
              formik.touched.lastName && formik.errors.lastName ? "text-red-500" : ""
            }`}
          >
            {formik.touched.lastName && formik.errors.lastName
              ? formik.errors.lastName
              : "Last Name"}
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="firstName"
            className={`${
              formik.touched.firstName && formik.errors.firstName ? "text-red-500" : ""
            }`}
          >
            {formik.touched.firstName && formik.errors.firstName
              ? formik.errors.firstName
              : "First Name"}
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className={`${
            formik.touched.email && formik.errors.email ? "text-red-500" : ""
          }`}
        >
          {formik.touched.email && formik.errors.email
            ? formik.errors.email
            : "Email"}
        </label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border-[1.5px] border-neutral-300 w-full rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div className="flex gap-10 items-center justify-start">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="phone"
            className={`${
              formik.touched.phone && formik.errors.phone
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.phone && formik.errors.phone
              ? formik.errors.phone
              : "phone"}
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="gender"
            className={`${
              formik.touched.gender && formik.errors.gender ? "text-red-500" : ""
            }`}
          >
            {formik.touched.gender && formik.errors.gender
              ? formik.errors.gender
              : "Gender"}
          </label>
          <select
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-secondary h-12 p-3"
          >
            <option value="" label="Gender" hidden />
            <option value="Male" label="Male" />
            <option value="Female" label="Female" />
          </select>
        </div>
      </div>

      <div className="flex gap-10 items-center justify-start">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="birthDate"
            className={`${
              formik.touched.birthDate && formik.errors.birthDate
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.birthDate && formik.errors.birthDate
              ? formik.errors.birthDate
              : "Birthdate"}
          </label>
          <input
            type="date"
            name="birthDate"
            value={formik.values.birthDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="maritalStatus"
            className={`${
              formik.touched.maritalStatus && formik.errors.maritalStatus
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.maritalStatus && formik.errors.maritalStatus
              ? formik.errors.maritalStatus
              : "Marital Status"}
          </label>
          <select
            name="maritalStatus"
            value={formik.values.maritalStatus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md h-12 p-3 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="" label="Marital Status" hidden />
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
        </div>
      </div>

      <div className="flex gap-10 items-center justify-end">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-secondary px-10 py-2 text-white w-fit rounded-xl font-semibold text-lg"
          type="submit"
        >
          Next
        </motion.button>
      </div>
    </form>
  );
};

export default FirstStep;
