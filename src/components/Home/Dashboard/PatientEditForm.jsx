import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PatientEditForm = ({ patient, onSave }) => {
  const formik = useFormik({
    initialValues: {
      firstName: patient.firstName || '',
      lastName: patient.lastName || '',
      email: patient.email || '',
      phone: patient.phone || '',
      gender: patient.gender || 'Male',
      maritalStatus: patient.maritalStatus || 'Single',
      birthDate: patient.birthDate || '',
      medicalHistory: patient.medicalHistory || '',
      medications: patient.medications || '',
      summaryReport: patient.summaryReport || '',
      reasonForConsultation: patient.reasonForConsultation || '',
      visitDate: patient.visitDate || '',
      nextAppointmentDate: patient.nextAppointmentDate || '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phone: Yup.string().required('Required'),
      birthDate: Yup.date().required('Required'),
      visitDate: Yup.date().required('Required'),
      nextAppointmentDate: Yup.date().required('Required'),
    }),
    onSubmit: (values) => {
      onSave(values);
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 bg-white shadow-md rounded-lg space-y-6"
      >
        <div className="grid grid-cols-2 gap-6">
          {['firstName', 'lastName', 'email', 'phone'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formik.touched[field] && formik.errors[field] ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors[field]}</div>
              ) : null}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender:</label>
            <select
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Marital Status:</label>
            <select
              name="maritalStatus"
              value={formik.values.maritalStatus}
              onChange={formik.handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {['birthDate', 'visitDate', 'nextAppointmentDate'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.replace(/([A-Z])/g, ' $1') + ':'}
              </label>
              <input
                type="date"
                name={field}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {formik.touched[field] && formik.errors[field] ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors[field]}</div>
              ) : null}
            </div>
          ))}
        </div>

        {['medicalHistory', 'medications', 'summaryReport', 'reasonForConsultation'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              {field.replace(/([A-Z])/g, ' $1') + ':'}
            </label>
            <textarea
              name={field}
              value={formik.values[field]}
              onChange={formik.handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
        ))}

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientEditForm;
