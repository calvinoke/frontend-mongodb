import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const SecondStep = ({ formData, onNext, onBack }) => {
  const formik = useFormik({
    initialValues: {
      medicalHistory: formData.medicalHistory || "",
      medications: formData.medications || "",
      summaryReport: formData.summaryReport || "",
      reasonForConsultation: formData.reasonForConsultation || "",
    },

    validationSchema: Yup.object({
      medicalHistory: Yup.string().required("Medical history is required"),
      medications: Yup.string().required("Current medications are required"),
      summaryReport: Yup.string().required("Medical report is required"),
      reasonForConsultation: Yup.string().required("Reason for consultation is required"),
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
        src="icons/step2.svg"
        alt="" // Set to empty string if the image is purely decorative
        className="w-2/5 right-[20rem] absolute top-[-2rem]"
      />
      <div className="flex gap-10 items-center justify-start">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="medicalHistory"
            className={`${
              formik.touched.medicalHistory && formik.errors.medicalHistory
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.medicalHistory && formik.errors.medicalHistory
              ? formik.errors.medicalHistory
              : "Medical History"}
          </label>
          <input
            type="text"
            name="medicalHistory"
            placeholder="Medical history"
            value={formik.values.medicalHistory}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="reasonForConsultation"
            className={`${
              formik.touched.reasonForConsultation && formik.errors.reasonForConsultation
                ? "text-red-500"
                : ""
            }`}
          >
            {formik.touched.reasonForConsultation && formik.errors.reasonForConsultation
              ? formik.errors.reasonForConsultation
              : "Reason for Consultation"}
          </label>
          <input
            type="text"
            name="reasonForConsultation"
            placeholder="Reason for consultation"
            value={formik.values.reasonForConsultation}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border-[1.5px] border-neutral-300 w-[24.5rem] rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="currentMedications"
          className={`${
            formik.touched.medications && formik.errors.medications
              ? "text-red-500"
              : ""
          }`}
        >
          {formik.touched.medications && formik.errors.medications
            ? formik.errors.medications
            : "Current Medications"}
        </label>
        <input
          type="text"
          name="medications"
          placeholder="Current medications"
          value={formik.values.medications}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border-[1.5px] border-neutral-300 w-full rounded-md p-6 h-9 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="medicalReport"
          className={`${
            formik.touched.summaryReport && formik.errors.summaryReport
              ? "text-red-500"
              : ""
          }`}
        >
          {formik.touched.summaryReport && formik.errors.summaryReport
            ? formik.errors.summaryReport
            : "Medical Report"}
        </label>
        <textarea
          type="text"
          name="summaryReport"
          placeholder="Please enter the medical report"
          value={formik.values.summaryReport}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border-[1.5px] border-neutral-300 w-full rounded-md p-3 h-32 outline-none focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      <div className="flex gap-10 items-center justify-between">
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="border-2 border-neutral-300 px-10 py-2 w-fit rounded-xl font-semibold text-lg"
          onClick={() => {
            // Manually updating the formData with the current values
            formData.medicalHistory = formik.values.medicalHistory;
            formData.medications = formik.values.medications;
            formData.summaryReport = formik.values.summaryReport;
            formData.reasonForConsultation = formik.values.reasonForConsultation;
            onBack(1);
          }}
        >
          Previous
        </motion.button>
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

export default SecondStep;
