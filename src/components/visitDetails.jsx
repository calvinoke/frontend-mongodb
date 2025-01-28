import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function VisitDetail() {
  const { patientId, visitId } = useParams();
  const [visit, setVisit] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/visits/${patientId}/${visitId}`)
      .then(response => setVisit(response.data))
      .catch(error => console.error(error));

      axiosInstance.get(`/prescriptions/${patientId}/${visitId}/all`)
      .then(response => setPrescriptions(response.data))
      .catch(error => console.error(error));
  }, [patientId, visitId]);

  const validationSchema = Yup.object({
    Consultation_Reason: Yup.string().required('Consultation reason is required'),
  });

  const formik = useFormik({
    initialValues: {
      Consultation_Reason: visit ? visit.Consultation_Reason : '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      axiosInstance.put(`/visits/${patientId}/${visitId}`, values)
        .then(response => console.log('Visit updated', response))
        .catch(error => console.error(error));
    },
  });

  if (!visit) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Visit Details</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Consultation Reason:
          <input
            type="text"
            name="Consultation_Reason"
            value={formik.values.Consultation_Reason}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Consultation_Reason && formik.errors.Consultation_Reason ? (
            <div>{formik.errors.Consultation_Reason}</div>
          ) : null}
        </label>
        <button type="submit">Update Visit</button>
      </form>
      <h3>Prescriptions</h3>
      <ul>
        {prescriptions.map(prescription => (
          <li key={prescription._id}>
            <Link to={`/patient/${patientId}/visit/${visitId}/prescription/${prescription._id}`}>Prescription {prescription._id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VisitDetail;
