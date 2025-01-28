import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function VisitList() {
  const { patientId } = useParams();
  const [visits, setVisits] = useState([]);

  //useffect is used to extract data from backend...
  useEffect(() => {
    axiosInstance.get(`/visits/${patientId}/all`)
      .then(response => setVisits(response.data))
      .catch(error => console.error(error));
  }, [patientId]);

  const validationSchema = Yup.object({
    visitNumber: Yup.string().required('Visit number is required'),
  });

  const formik = useFormik({
    initialValues: {
      visitNumber: '',
    },
    validationSchema,
    onSubmit: (values) => {
      axiosInstance.get(`/visits/${patientId}/all?visitNumber=${values.visitNumber}`)
        .then(response => setVisits(response.data))
        .catch(error => console.error(error));
    },
  });

  return (
    <div>
      <h2>Visits for Patient {patientId}</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Visit Number:
          <input
            type="text"
            name="visitNumber"
            value={formik.values.visitNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.visitNumber && formik.errors.visitNumber ? (
            <div>{formik.errors.visitNumber}</div>
          ) : null}
        </label>
        <button type="submit">Search</button>
      </form>
      <ul>
        {visits.map(visit => (
          <li key={visit._id}>
            <Link to={`/patient/${patientId}/visit/${visit._id}`}>Visit {visit.Visit_Number}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VisitList;
