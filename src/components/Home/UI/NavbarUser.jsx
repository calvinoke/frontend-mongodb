import { useState, useEffect } from "react";
import axiosInstance from "../../../config/axiosConfig.jsx";

const NavbarUser = () => {
  const [name, setName] = useState(localStorage.getItem("firstName") || "");
  const [specialty, setSpecialty] = useState(localStorage.getItem("specialty") || "");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const activePage = window.location.pathname;

  // Fetch user profile if name or specialty is missing
  useEffect(() => {
    if (!name || !specialty) {
      axiosInstance
        .get("/users/profile")
        .then((res) => {
          const { firstName, lastName, username, email, phoneNumber, specialty } = res.data;
          localStorage.setItem("firstName", firstName);
          localStorage.setItem("lastName", lastName);
          localStorage.setItem("Username", username);
          localStorage.setItem("Email", email);
          localStorage.setItem("PhoneNumber", phoneNumber);
          localStorage.setItem("Specialty", specialty);
          setName(lastName);
          setSpecialty(specialty);
        })
        .catch((err) => console.error(err));
    }
  }, [name, specialty]);

  // Fetch notifications from the server
  const fetchNotifications = () => {
    axiosInstance
      .get("/notifications/all")
      .then((res) => {
        setNotifications(res.data.notifications || []); // Default to an empty array
        setShowNotifications((prev) => !prev);
      })
      .catch((err) => console.error("Error fetching notifications:", err));
  };

  // Navigate to Help Page
  const handleHelp = () => {
    window.location.href = "/help"; // Redirect to a help/support page
  };

  // Determine the active page for the heading
  const getPage = () => {
    switch (activePage) {
      case "/dashboard":
        return "Dashboard";
      case "/password":
        return "Change Password";
      case "/profile":
        return "My Profile";
      case "/history":
        return "History";
      case "/add-patient":
        return "Add Patient";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex justify-between items-center px-10 py-5 border-b-2 gap-10">
      <div>
        <h2 className="text-3xl font-bold font-poppins">{getPage()}</h2>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex gap-5">
          {/* Notification Icon */}
          <img
            src="icons/notification.svg"
            alt="Notification Icon"
            onClick={fetchNotifications}
            className="cursor-pointer"
          />
          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute top-16 right-20 bg-white border shadow-md rounded-lg p-4 w-72">
              <h3 className="font-bold text-lg mb-3">Notifications</h3>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <p key={index} className="text-sm mb-2">
                    {notification.message}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-500">No new notifications</p>
              )}
            </div>
          )}
          {/* Help Icon */}
          <img
            src="icons/help.svg"
            alt="Help Icon"
            onClick={handleHelp}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-sm font-semibold opacity-50">{specialty}</p>
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
