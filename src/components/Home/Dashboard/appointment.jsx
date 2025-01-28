import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../../config/axiosConfig';

function AppointmentForm() {
  const { patientId, appointmentId } = useParams();
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const formikRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      patientId: patientId || '',
      appointmentDate: '',
      appointmentTime: '',
    },
    validationSchema: Yup.object({
      patientId: Yup.string().required('Patient is required'),
      appointmentDate: Yup.string().required('Appointment date is required'),
      appointmentTime: Yup.string().required('Appointment time is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const apiCall = selectedAppointment
        ? axiosInstance.put(`/appointments/${selectedAppointment.patientId}/${selectedAppointment.id}`, values)
        : axiosInstance.post(`/appointments/${values.patientId}/add`, values);

      apiCall
        .then(() => {
          setMessage('Appointment saved successfully!');
          resetForm();
          setSelectedAppointment(null);
          return axiosInstance.get('/appointments/all');
        })
        .then(response => setAppointments(response.data))
        .catch(error => setMessage('Error saving appointment: ' + error.message));
    },
  });

  formikRef.current = formik;

  useEffect(() => {
    axiosInstance.get('/patients/all')
  .then(response => {
    console.log('Response data:', response.data);
    setPatients(response.data);
  })
  .catch(error => {
    console.error('Error fetching patients:', error);
  });

  
    axiosInstance.get('/appointments/all')
      .then(response => {
        setAppointments(response.data);
        if (appointmentId) {
          const appointment = response.data.find(appt => appt.id === appointmentId);
          if (appointment) {
            setSelectedAppointment(appointment);
            updateFormikValues(appointment);
          }
        }
      })
      .catch(error => console.error('Error fetching appointments:', error));
  }, [appointmentId]);
  
  const updateFormikValues = (appointment) => {
    formik.setValues({
      patientId: appointment.patientId,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
    });
  };
  
  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    formik.setValues({
      patientId: appointment.patientId,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
    });
  };

  const handleDelete = (patientId, appointmentId) => {
    axiosInstance.delete(`/appointments/${patientId}/${appointmentId}`)
      .then(() => {
        setMessage('Appointment deleted successfully');
        setAppointments(appointments.filter(appt => appt.id !== appointmentId));
      })
      .catch(error => {
        setMessage('Error deleting appointment: ' + error.message);
      });
  };

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = (i + 6) % 24;
    const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const meridian = hour < 12 ? 'AM' : 'PM';
    const time = `${hour.toString().padStart(2, '0')}:00`;
    return { value: time, label: `${hour12}:00 ${meridian}` };
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{selectedAppointment ? 'Edit' : 'Schedule'} An Appointment</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient</label>
          <select
            id="patientId"
            name="patientId"
            value={formik.values.patientId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a patient</option>
            {patients.map(patient => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>
          {formik.touched.patientId && formik.errors.patientId && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.patientId}</div>
          )}
        </div>

        <div>
          <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            id="appointmentDate"
            name="appointmentDate"
            type="date"
            value={formik.values.appointmentDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {formik.touched.appointmentDate && formik.errors.appointmentDate && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.appointmentDate}</div>
          )}
        </div>

        <div>
          <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">Time</label>
          <select
            id="appointmentTime"
            name="appointmentTime"
            value={formik.values.appointmentTime}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 block w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a time</option>
            {timeSlots.map(slot => (
              <option key={slot.value} value={slot.value}>
                {slot.label}
              </option>
            ))}
          </select>
          {formik.touched.appointmentTime && formik.errors.appointmentTime && (
            <div className="text-red-600 text-sm mt-1">{formik.errors.appointmentTime}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {selectedAppointment ? 'Update' : 'Submit'}
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-8">Appointments</h3>
      <ul className="mt-4 space-y-2">
        {appointments.map(appt => (
          <li key={appt.id} className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center">
            <span>{appt.appointmentDate} at {appt.appointmentTime} - Patient ID: {appt.patientId}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(appt)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(appt.patientId, appt.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentForm;
