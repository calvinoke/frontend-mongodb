import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const FirstStep = ({ formData, onNext }) => {
  const formik = useFormik({
    initialValues: {
      FirstName: formData.FirstName || "",
      LastName: formData.LastName || "",
      EmailAddress: formData.EmailAddress || "",
      PhoneNumber: formData.PhoneNumber || "",
      Gender: formData.Gender || "",
      BirthDate: formData.BirthDate || "",
      MaritalStatus: formData.MaritalStatus || "",
    },

    validationSchema: Yup.object({
      FirstName: Yup.string().required("First Name is required"),
      LastName: Yup.string().required("Last Name is required"),
      EmailAddress: Yup.string()
        .email("Invalid Email Address")
        .required("Email Address is required"),
      PhoneNumber: Yup.string()
        .required("Phone Number is required")
        .matches(/^[0-9]+$/, "Phone Number must be numeric"),
      Gender: Yup.string().required("Gender is required"),
      BirthDate: Yup.string().required("Birth Date is required"),
      MaritalStatus: Yup.string().required("Marital Status is required"),
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
      <img
        src="icons/step1.svg"
        alt="step1 form image"
        className="w-2/5 right-[20rem] absolute top-[-2rem]"
      />
      <div className="flex gap-10 items-center justify-start">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="FirstName"
            className={`${
              formik.touched.FirstName && formik.errors.FirstName
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.FirstName && formik.errors.FirstName
              ? formik.errors.FirstName
              : "First Name"}
          </label>
          <input
            type="text"
            name="FirstName"
            placeholder="First Name"
            value={formik.values.FirstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="LastName"
            className={`${
              formik.touched.LastName && formik.errors.LastName
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.LastName && formik.errors.LastName
              ? formik.errors.LastName
              : "Last Name"}
          </label>
          <input
            type="text"
            name="LastName"
            placeholder="Last Name"
            value={formik.values.LastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className=" border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="EmailAddress"
          className={`${
            formik.touched.EmailAddress && formik.errors.EmailAddress
              ? "text-red-500"
              : ""
          }`}
        >
          {formik.touched.EmailAddress && formik.errors.EmailAddress
            ? formik.errors.EmailAddress
            : "Email Address"}
        </label>
        <input
          type="text"
          name="EmailAddress"
          placeholder="Email Address"
          value={formik.values.EmailAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border-[1.5px] border-neutral-300 w-full rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div className="flex gap-10 items-center justify-start">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="PhoneNumber"
            className={`${
              formik.touched.PhoneNumber && formik.errors.PhoneNumber
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.PhoneNumber && formik.errors.PhoneNumber
              ? formik.errors.PhoneNumber
              : "Phone Number"}
          </label>
          <input
            type="text"
            name="PhoneNumber"
            placeholder="Phone Number"
            value={formik.values.PhoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="Gender"
            className={`${
              formik.touched.Gender && formik.errors.Gender ? "text-red-500" : ""
            }`}
          >
            {formik.touched.Gender && formik.errors.Gender
              ? formik.errors.Gender
              : "Gender"}
          </label>
          <select
            name="Gender"
            value={formik.values.Gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-secondary h-12 p-3"
          >
            <option value="" label="Select Gender" hidden />
            <option value="Male" label="Male" />
            <option value="Female" label="Female" />
          </select>
        </div>
      </div>

      <div className="flex gap-10 items-center justify-start">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="BirthDate"
            className={`${
              formik.touched.BirthDate && formik.errors.BirthDate
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.BirthDate && formik.errors.BirthDate
              ? formik.errors.BirthDate
              : "Date of Birth"}
          </label>
          <input
            type="date"
            name="BirthDate"
            value={formik.values.BirthDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="MaritalStatus"
            className={`${
              formik.touched.MaritalStatus && formik.errors.MaritalStatus
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.MaritalStatus && formik.errors.MaritalStatus
              ? formik.errors.MaritalStatus
              : "Marital Status"}
          </label>
          <select
            name="MaritalStatus"
            value={formik.values.MaritalStatus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md h-12 p-3 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            <option value="" label="Select Marital Status" hidden />
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
