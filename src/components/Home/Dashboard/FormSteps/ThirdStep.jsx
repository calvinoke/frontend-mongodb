import React, { useState } from "react";
// Import React and useState hook for managing component state.

import { useFormik } from "formik";
// Import useFormik for handling form state and validation.

import * as Yup from "yup";
// Import Yup for schema-based form validation.

import { motion } from "framer-motion";
// Import motion from framer-motion for animation effects.

import axiosInstance from "../../../../config/axiosConfig.jsx";
// Import a configured axios instance for making HTTP requests.

import { toast, ToastContainer } from "react-toastify";
// Import toast and ToastContainer for displaying notification messages.

import Dropzone from "react-dropzone-uploader";
// Import Dropzone for handling file uploads.

import "react-dropzone-uploader/dist/styles.css";
// Import Dropzone styles.

// Functional component that represents the third step of a multi-step form.
const ThirdStep = ({ formData, onBack }) => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage for authentication.

  const [isUpdatePreview, setIsUpdatePreview] = useState(false);
  // State for toggling the preview update.

  const sendData = new FormData();
  // Initialize a new FormData object to handle form data submission.

  const formik = useFormik({
    initialValues: {
      visitDate: formData.visitDate || "",
      nextAppointmentDate: formData.nextAppointmentDate || "",
      reports: [],
      images: [],
    },
    // Formik form initialization with default values from formData or empty values.

    validationSchema: Yup.object({
      visitDate: Yup.string().required("Visit date is required"),
      nextAppointmentDate: Yup.string().required("Next appointment is required"),
      reports: Yup.array()
        .max(10, "Maximum of 10 files allowed")
        .required("Reports are required"),
      images: Yup.array()
        .max(10, "Maximum of 10 files allowed")
        .required("Images are required"),
    }),
    // Define validation schema using Yup to ensure form data is valid.

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // Handle form submission with asynchronous function.
      try {
        const combinedData = { ...formData, ...values };
        // Combine existing form data with new form values.

        Object.entries(combinedData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((file) => sendData.append(key, file));
          } else {
            sendData.append(key, value);
          }
        });
        // Append form data and files to FormData object.

        const response = await axiosInstance.post("/patients/add", sendData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
          
        });

        toast.success("Patient added successfully!");
        // Display success notification.
       

        setTimeout(() => {
          resetForm();
        }, 2000);
        // Reset form after a delay to ensure a smooth user experience.
      } catch (error) {
        console.error("Error adding patient:", error);
        // Log any errors encountered during form submission.

        toast.error("Failed to add patient. Please try again.");
        // Display error notification.
      } finally {
        setSubmitting(false);
        // Set formik submitting state to false after handling submission.
      }
    },
  });

  const handleUploadStatusChange = (file, status, formDataKey) => {
    // Handle changes in upload status for the Dropzone component.
    setIsUpdatePreview(!isUpdatePreview);
    if (status === "done") {
      if (!formik.values[formDataKey].includes(file.file)) {
        formik.values[formDataKey].push(file.file);
      }
    } else if (status === "removed") {
      formik.values[formDataKey] = formik.values[formDataKey].filter(
        (item) => item !== file.file
      );
    }
  };
  // Function to manage the status of uploaded files (add/remove).

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-6 p-10 px-20 w-4/5 m-auto relative"
      encType="multipart/form-data"
    >
      <ToastContainer />

      <img
        src="icons/step3.svg"
        alt="Step 3 form"
        className="w-2/5 absolute top-[-2rem] right-[20rem]"
      />

      <div className="flex gap-10 items-center">
        <div className="flex flex-col gap-2">
          <label htmlFor="visitDate">
            {formik.touched.visitDate && formik.errors.visitDate
              ? formik.errors.visitDate
              : "Visit Date"}
          </label>
          <input
            type="date"
            name="visitDate"
            value={formik.values.visitDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="nextAppointmentDate">
            {formik.touched.nextAppointmentDate && formik.errors.nextAppointmentDate
              ? formik.errors.nextAppointmentDate
              : "Next Appointment"}
          </label>
          <input
            type="date"
            name="nextAppointmentDate"
            value={formik.values.nextAppointmentDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="reports">Reports</label>
        <Dropzone
          onChangeStatus={(file, status) =>
            handleUploadStatusChange(file, status, "reports")
          }
          accept="image/*, application/pdf, .doc, .docx, .xls, .xlsx, .txt, .csv"
          maxFiles={10}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="images">Images</label>
        <Dropzone
          onChangeStatus={(file, status) =>
            handleUploadStatusChange(file, status, "images")
          }
          accept="image/*"
          maxFiles={10}
        />
      </div>

      <div className="flex gap-10">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            formData.visitDate = formik.values.visitDate;
            formData.nextAppointmentDate = formik.values.nextAppointmentDate;
            onBack();
          }}
          className="bg-gray-300 px-6 py-2 rounded-md"
        >
          Previous
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={formik.isSubmitting}
          className="bg-blue-500 text-white px-6 py-2 rounded-md"
        >
          {formik.isSubmitting ? "Submitting..." : "Submit"}
        </motion.button>
      </div>
    </form>
  );
};

export default ThirdStep;
// Export the ThirdStep component for use in other parts of the application.
