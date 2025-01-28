import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosInstance from "../../../config/axiosConfig.jsx";

// Get the active page from the current window location
const activePage = window.location.pathname;

// Function to add active class based on the current page
const getClassNames = (page) => {
  return page === activePage ? "bg-secondary bg-opacity-10 text-secondary" : "";
};

// Function to get the current word based on the active page
const getCurrentWord = (page) => {
  return page === activePage ? "Current" : "";
};

const SideBar = () => {
  const navigate = useNavigate();

  // State for dynamic route parameters
  const [patientId, setPatientId] = useState(); 
  const [visitId, setVisitId] = useState(); 
  const [prescriptionId, setPrescriptionId] = useState(); 

  return (
    <div className="h-full flex flex-col items-center justify-between w-1/5 border-r-2 py-6">
      <div className="flex flex-col gap-20 w-full px-10">
        {/* Logo and Title */}
        <h2
          onClick={() => navigate("/")}
          className="text-4xl font-bold mb-5 text-center font-racingSansOne text-secondary flex gap-5 items-center justify-center cursor-pointer"
        >
          <img src="ico.svg" alt="MedFlow logo" />
          Health MS
        </h2>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-8 text-xl font-semibold mb-5 text-start">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "bg-secondary bg-opacity-10 text-secondary" : ""}>
            <li className="rounded-xl w-full py-3 px-5 hover:bg-secondary hover:bg-opacity-10 transition-all duration-200 flex gap-4">
              <img src={`icons/dashboard${getCurrentWord("/dashboard") || ""}.svg`} alt="dashboard icon" />
              <p>Dashboard</p>
            </li>
          </NavLink>

          <NavLink to="/profile" className={({ isActive }) => isActive ? "bg-secondary bg-opacity-10 text-secondary" : ""}>
            <li className="rounded-xl w-full py-3 px-5 hover:bg-secondary hover:bg-opacity-10 transition-all duration-200 flex gap-4">
              <img src={`icons/profil${getCurrentWord("/profile") || ""}.svg`} alt="profile icon" />
              <p>Profile</p>
            </li>
          </NavLink>

          <NavLink to="/history" className={({ isActive }) => isActive ? "bg-secondary bg-opacity-10 text-secondary" : ""}>
            <li className="rounded-xl w-full py-3 px-5 hover:bg-secondary hover:bg-opacity-10 transition-all duration-200 flex gap-4">
              <img src={`icons/history${getCurrentWord("/history") || ""}.svg`} alt="history icon" />
              <p>History</p>
            </li>
          </NavLink>

          <NavLink to={`/appointments/${patientId}/${visitId}`} className={({ isActive }) => isActive ? "bg-secondary bg-opacity-10 text-secondary" : ""}>
            <li className="rounded-xl w-full py-3 px-5 hover:bg-secondary hover:bg-opacity-10 transition-all duration-200 flex gap-4">
              <img src={`icons/appointment${getCurrentWord(`/appointments/${patientId}`) || ""}.svg`} alt="appointment icon" className="w-6 h-6" />
              <p>Appointment</p>
            </li>
          </NavLink>

          {/* Visits link with smaller icon */}
          <NavLink 
            to={`/patient/${patientId}/visits`} 
            className={({ isActive }) => isActive ? "bg-secondary bg-opacity-10 text-secondary" : ""}
          >
            <li className="rounded-xl w-full py-3 px-5 hover:bg-secondary hover:bg-opacity-10 transition-all duration-200 flex gap-4">
              <img src={`icons/visits.svg`} alt="visits icon" className="w-5 h-5" />
              <p>Visits</p>
            </li>
          </NavLink>

          {/* Visit Detail link with smaller icon */}
          <NavLink 
            to={`/patient/${patientId}/visit/${visitId}`} 
            className={({ isActive }) => isActive ? "bg-secondary bg-opacity-10 text-secondary" : ""}
          >
            <li className="rounded-xl w-full py-3 px-5 hover:bg-secondary hover:bg-opacity-10 transition-all duration-200 flex gap-4">
              <img src={`icons/visit-detail.svg`} alt="visit detail icon" className="w-5 h-5" />
              <p>Visit Detail</p>
            </li>
          </NavLink>

          {/* Prescription Detail link with smaller icon */}
          <NavLink 
            to={`/patient/${patientId}/visit/${visitId}/prescription/${prescriptionId}`} 
            className={({ isActive }) => isActive ? "bg-secondary bg-opacity-10 text-secondary" : ""}
          >
            <li className="rounded-xl w-full py-3 px-5 hover:bg-secondary hover:bg-opacity-10 transition-all duration-200 flex gap-4">
              <img src={`icons/prescription-detail.svg`} alt="prescription detail icon" className="w-5 h-5" />
              <p>Prescription Detail</p>
            </li>
          </NavLink>
        </ul>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => {
          axiosInstance
            .post("/users/logout")
            .then((response) => {
              console.log(response.data);
              localStorage.removeItem("token");
              localStorage.removeItem("roles");
              navigate("/signin");
            })
            .catch((error) => {
              console.error(error);
            });
        }}
        className="rounded-xl font-semibold text-xl text-red-600 hover:bg-red-100 animate-ease-out transition-all duration-200
        flex gap-4 items-center justify-center py-3 px-5"
      >
        <img src="icons/logout.svg" alt="logout icon" className="w-5 h-5" />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default SideBar;
