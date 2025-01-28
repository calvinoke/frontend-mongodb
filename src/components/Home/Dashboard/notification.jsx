import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../config/axiosConfig';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/notifications/all');
        setNotifications(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Formik setup for handling forms (if needed)
  const formik = useFormik({
    initialValues: {
      notificationId: '',
    },
    validationSchema: yup.object({
      notificationId: yup.string().required('Notification ID is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axiosInstance.delete(`/notifications/${values.notificationId}`);
        setNotifications((prev) =>
          prev.filter((n) => n._id !== values.notificationId)
        );
      } catch (err) {
        setError(err.message);
      }
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>
            {notification.message} - {notification.date}
            {!notification.seen && <span> (Unread)</span>}
          </li>
        ))}
      </ul>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="notificationId">Notification ID:</label>
        <input
          id="notificationId"
          name="notificationId"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.notificationId}
        />
        {formik.touched.notificationId && formik.errors.notificationId ? (
          <div>{formik.errors.notificationId}</div>
        ) : null}
        <button type="submit">Delete Notification</button>
      </form>
    </div>
  );
};

export default Notifications;
