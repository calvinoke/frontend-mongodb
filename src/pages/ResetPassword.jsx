import Navbar from "../components/LandingPage/Navbar.jsx"; // Navigation bar component
import { useFormik } from "formik"; // Form handling library
import * as Yup from "yup"; // Schema validation library...
import axiosInstance from "../config/axiosConfig.jsx"; // Pre-configured Axios instance for API calls
import { toast, ToastContainer } from "react-toastify"; // Toast notifications for feedback
import "react-toastify/dist/ReactToastify.css"; // Styles for toast notifications
import { motion } from "framer-motion"; // Library for animations

// ResetPassword Component
const ResetPassword = () => {
  // Formik for managing form state and validation
  const formik = useFormik({
    initialValues: {
      newPassword: "", // Field for new password
      confirmPassword: "", // Field for confirming new password
    },
    validationSchema: Yup.object({
      // Validation schema for the form
      newPassword: Yup.string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters long"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirmation password is required"),
    }),
    onSubmit: (values) => {
      // Extracting the new password
      const { newPassword } = values;
      // Extracting the token from the URL
      const token = window.location.pathname.split("/").pop();

      // API call to reset the password
      axiosInstance
        .post(`users/reset-password/${token}`, { newPassword })
        .then((response) => {
          // Show success notification
          toast.success(response.data.message);
          // Redirect to the sign-in page after 3 seconds
          setTimeout(() => {
            window.location.href = "/signin";
          }, 3000);
        })
        .catch((error) => {
          // Handle errors (e.g., expired link)
          console.error(error.response);
          toast.error("The reset link has expired or is invalid");
        });
    },
  });

  return (
    <>
      {/* Full-page container */}
      <div className="bg-secondary h-screen">
        {/* Navbar */}
        <Navbar />
        {/* Toast notifications */}
        <ToastContainer />
        {/* Centered content */}
        <div className="flex justify-center my-32">
          <div className="bg-white p-16 rounded-lg">
            <h1 className="text-3xl font-semibold">Reset Your Password</h1>
            {/* Password reset form */}
            <form onSubmit={formik.handleSubmit} className="mt-5">
              {/* New Password Field */}
              <label
                htmlFor="newPassword"
                className={`text-sm ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "text-red-500"
                    : ""
                }`}
              >
                {formik.touched.newPassword && formik.errors.newPassword
                  ? formik.errors.newPassword
                  : "New Password"}
              </label>
              <motion.input
                type="password"
                placeholder="Enter your new password"
                className={`border-2 w-full p-2 focus:outline-none rounded-md ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-secondary border-primary"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                name="newPassword"
                id="newPassword"
              />

              {/* Confirm Password Field */}
              <label
                htmlFor="confirmPassword"
                className={`text-sm ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "text-red-500"
                    : ""
                }`}
              >
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : "Confirm Password"}
              </label>
              <motion.input
                type="password"
                placeholder="Confirm your new password"
                className={`border-2 w-full p-2 focus:outline-none rounded-md ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500 focus:border-red-500"
                    : "focus:border-secondary border-primary"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                name="confirmPassword"
                id="confirmPassword"
              />

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="bg-primary text-white w-full mt-5 p-2 rounded-md"
              >
                Reset Password
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
