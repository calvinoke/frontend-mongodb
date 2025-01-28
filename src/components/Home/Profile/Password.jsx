import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../config/axiosConfig.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../UI/BackButton.jsx";

const Password = () => {
  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },

    // Form validation
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("The old password is required"),

      newPassword: Yup.string()
        .min(8, "The new password must contain at least 8 characters")
        .required("The new password is required"),
    }),

    // Form submission
    onSubmit: (values) => {
      axiosInstance
        .put(
          "users/updatePassword",
          {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
          },
          { headers: { "x-access-token": token } }
        )
        .then((response) => {
          console.log(response);

          // Show a success message to the user
          toast.success("The changes made saved successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          console.error(error);
          // Handle incorrect old password error
          if (error.response.status === 406) {
            toast.error("The old password is incorrect", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    },
  });

  return (
    <>
      <ToastContainer />
      <BackButton />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-16  m-auto"
      >
        <div className="flex flex-col gap-10 items-center justify-start">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="oldPassword"
              className={`${
                formik.touched.oldPassword && formik.errors.oldPassword
                  ? "text-red-500"
                  : ""
              }`}
            >
              {formik.touched.oldPassword && formik.errors.oldPassword
                ? formik.errors.oldPassword
                : "Old Password"}
            </label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary`}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="newPassword"
              className={`${
                formik.touched.newPassword && formik.errors.newPassword
                  ? "text-red-500"
                  : ""
              }`}
            >
              {formik.touched.newPassword && formik.errors.newPassword
                ? formik.errors.newPassword
                : "New Password"}
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>
        <div className="flex gap-10 items-center justify-between">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => (window.location.href = "/forgetpassword")}
            className="border-2 border-neutral-300 px-10 py-2 w-fit rounded-xl font-semibold text-lg"
          >
            Forgot Password?
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-secondary px-10 py-2 text-white w-fit rounded-xl font-semibold text-lg"
            type="submit"
          >
            Confirm Changes
          </motion.button>
        </div>
      </form>
    </>
  );
};
export default Password;
