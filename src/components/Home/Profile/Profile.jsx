import { motion } from "framer-motion"; // For adding animations to components
import { useFormik } from "formik"; // Handles form state, validation, and submission
import * as Yup from "yup"; // Validation schema for form inputs
import axiosInstance from "../../../config/axiosConfig.jsx"; // Pre-configured Axios instance for API requests
import { toast, ToastContainer } from "react-toastify"; // Displays toast notifications for feedback
import "react-toastify/dist/ReactToastify.css"; // Styles for toast notifications

const Profile = () => {
  // Retrieve user's information from localStorage
  let firstName = localStorage.getItem("firstName");
  let lastName = localStorage.getItem("lastName");
  let email = localStorage.getItem("email");
  let phoneNumber = localStorage.getItem("phoneNumber");
  let specialty = localStorage.getItem("specialty");
  let username = localStorage.getItem("username");
  let profilePhoto = localStorage.getItem("profilePhoto"); // Retrieve profile photo
  const token = localStorage.getItem("token");

  // Fetch missing information from the server if not available locally
  if (!firstName || !lastName || !email || !phoneNumber || !specialty || !username || !profilePhoto) {
    axiosInstance
      .get("users/profile", { headers: { "x-access-token": token } })
      .then((response) => {
        // Store the fetched profile data into localStorage
        localStorage.setItem("firstName", response.data.firstName);
        localStorage.setItem("lastName", response.data.lastName);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("phoneNumber", response.data.phoneNumber);
        localStorage.setItem("specialty", response.data.specialty);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("profilePhoto", response.data.profilePhoto); // Save profile photo
      })
      .catch((error) => {
        console.error(error);
      });

    firstName = localStorage.getItem("firstName");
    lastName = localStorage.getItem("lastName");
    email = localStorage.getItem("email");
    phoneNumber = localStorage.getItem("phoneNumber");
    specialty = localStorage.getItem("specialty");
    username = localStorage.getItem("username");
    profilePhoto = localStorage.getItem("profilePhoto");
  }

  // Initialize Formik for form state management and validation
  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      email,
      phoneNumber,
      specialty,
      username,
      profilePhoto,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(20, "First name must not exceed 20 characters").required("First name is required"),
      lastName: Yup.string().max(20, "Last name must not exceed 20 characters").required("Last name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phoneNumber: Yup.string().matches(/^[0-9]+$/, "Invalid phone number").required("Phone number is required"),
      specialty: Yup.string().max(40, "Specialty must not exceed 40 characters").required("Specialty is required"),
      username: Yup.string().max(20, "Username must not exceed 20 characters").required("Username is required"),
    }),
    onSubmit: (values) => {
      const updatedProfileData = new FormData(); // Create a new FormData object
    
      // Append the form data (excluding the profile photo)
      updatedProfileData.append("firstName", values.firstName);
      updatedProfileData.append("lastName", values.lastName);
      updatedProfileData.append("email", values.email);
      updatedProfileData.append("phoneNumber", values.phoneNumber);
      updatedProfileData.append("specialty", values.specialty);
      updatedProfileData.append("username", values.username);
    
      // If there's a profile photo, append it to the FormData as well
      if (values.profilePhoto) {
        updatedProfileData.append("profilePhoto", values.profilePhoto); // Profile photo as file
      }
    
      // Make the axios request with multipart/form-data content-type
      axiosInstance
        .put("users/profile", updatedProfileData, {
          headers: {
            "Content-Type": "multipart/form-data", // Specify the content type
            "x-access-token": token,
          },
        })
        .then((response) => {
          // Handle the response (update local storage, show success toast, etc.)
          localStorage.setItem("firstName", values.firstName);
          localStorage.setItem("lastName", values.lastName);
          localStorage.setItem("email", values.email);
          localStorage.setItem("phoneNumber", values.phoneNumber);
          localStorage.setItem("specialty", values.specialty);
          localStorage.setItem("username", values.username);
          localStorage.setItem("profilePhoto", values.profilePhoto); // Save updated profile photo
          toast.success("Profile updated successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error updating profile. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      formik.setFieldValue("profilePhoto", file); // Store the file directly in the formik state
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 p-10 px-20 w-4/5 m-auto">
      <ToastContainer />
      
      {/* Profile Photo */}
      <div className="flex items-center gap-6">
      <img
      src={
         formik.values.profilePhoto && formik.values.profilePhoto instanceof File
        ? URL.createObjectURL(formik.values.profilePhoto) // Use the uploaded photo
        : profilePhoto || "/default-profile.png" // Use the default if no photo
         }
         alt="Profile"
         className="w-24 h-24 rounded-full border border-gray-300"
         />

        <div>
          <label htmlFor="profilePhoto" className="block mb-2">Choose Profile Photo</label>
          <input
            type="file"
            name="profilePhoto"
            onChange={handleFileChange}
            accept="image/*"
            className="border-[1.5px] border-neutral-300 rounded-md p-2 w-64 outline-none"
          />
        </div>
      </div>

      {/* First Name and Last Name */}
      <div className="flex gap-10 items-center">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">{formik.errors.firstName || "First Name"}</label>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 rounded-md p-2 w-64 outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName">{formik.errors.lastName || "Last Name"}</label>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 rounded-md p-2 w-64 outline-none"
          />
        </div>
      </div>

      {/* Specialty */}
      <div className="flex flex-col gap-2">
        <label htmlFor="specialty">{formik.errors.specialty || "Specialty"}</label>
        <input
          type="text"
          name="specialty"
          placeholder="Specialty"
          value={formik.values.specialty}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border-[1.5px] border-neutral-300 rounded-md p-2 outline-none"
        />
      </div>

      {/* Save Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-500 text-white px-6 py-3 rounded-xl"
      >
        Save Changes
      </motion.button>
    </form>
  );
};

export default Profile;
