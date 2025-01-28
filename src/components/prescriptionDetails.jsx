import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from "../config/axiosConfig.jsx";


function PrescriptionDetail() {
  const { patientId, visitId, prescriptionId } = useParams();
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/prescriptions/${patientId}/${visitId}/${prescriptionId}`)
      .then(response => setPrescription(response.data))
      .catch(error => console.error(error));
  }, [patientId, visitId, prescriptionId]);

  const validationSchema = Yup.object({
    Medications: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Medication name is required'),
        dosage: Yup.string().required('Dosage is required'),
        duration: Yup.string().required('Duration is required'),
      })
    )
  });

  const formik = useFormik({
    initialValues: {
      Medications: prescription ? prescription.Medications : [],
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      axiosInstance.put(`/prescriptions/${patientId}/${visitId}/${prescriptionId}`, values)
        .then(response => console.log('Prescription updated', response))
        .catch(error => console.error(error));
    },
  });

  if (!prescription) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Prescription Details</h2>
      <form onSubmit={formik.handleSubmit}>
        {formik.values.Medications.map((medication, index) => (
          <div key={index}>
            <label>
              Name:
              <input
                type="text"
                name={`Medications[${index}].name`}
                value={formik.values.Medications[index].name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Medications && formik.touched.Medications[index]?.name && formik.errors.Medications && formik.errors.Medications[index]?.name && (
                <div>{formik.errors.Medications[index].name}</div>
              )}
            </label>
            <label>
              Dosage:
              <input
                type="text"
                name={`Medications[${index}].dosage`}
                value={formik.values.Medications[index].dosage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Medications && formik.touched.Medications[index]?.dosage && formik.errors.Medications && formik.errors.Medications[index]?.dosage && (
                <div>{formik.errors.Medications[index].dosage}</div>
              )}
            </label>
            <label>
              Duration:
              <input
                type="text"
                name={`Medications[${index}].duration`}
                value={formik.values.Medications[index].duration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.Medications && formik.touched.Medications[index]?.duration && formik.errors.Medications && formik.errors.Medications[index]?.duration && (
                <div>{formik.errors.Medications[index].duration}</div>
              )}
            </label>
          </div>
        ))}
        <button type="submit">Update Prescription</button>
      </form>
    </div>
  );
}

export default PrescriptionDetail;
