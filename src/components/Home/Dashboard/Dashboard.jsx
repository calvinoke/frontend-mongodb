// Import necessary libraries and components
import React, { useCallback, useEffect, useState } from "react"; // React hooks for state management and side effects
import axiosInstance from "../../../config/axiosConfig.jsx"; // Custom Axios instance for API calls
import PatientEditForm from "./PatientEditForm"; // Component for editing patient details

// Dashboard component that displays a list of patients and allows profile photo management
const Dashboard = () => {
  // State variables to manage patients, filtered list, search query, and other UI states
  const [patients, setPatients] = useState([]); // List of all patients
  const [filteredPatients, setFilteredPatients] = useState([]); // Filtered list based on search query
  const [query, setQuery] = useState(""); // Search query for filtering patients
  const token = localStorage.getItem("token"); // Token for API authentication
  const name = localStorage.getItem("firstName"); // User's first name
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem("profilePhoto")); // Profile photo URL
  //const [profilePhotoFile, setProfilePhotoFile] = useState(null); // File object for profile photo upload
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [currentPatient, setCurrentPatient] = useState(null); // Patient currently being edited

  // Function to filter patient list based on search query
  const filterItems = (items, query) => {
    if (!query) return items;
    return items.filter((item) =>
      item.firstName.toLowerCase().startsWith(query.toLowerCase()) // Case-insensitive match on first name
    );
  };

  // Event handler for search bar input change
  const handleChangeSearchBar = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm); // Update search query state
    setFilteredPatients(filterItems(patients, searchTerm)); // Update filtered list
  };

  // Function to load patients from the server using the custom Axios instance
  const loadPatients = useCallback(() => {
    axiosInstance
      .get("/patients/all", { headers: { "x-access-token": token } }) // API call to get all patients
      .then((response) => {
        setPatients(response.data); // Update patients state with response data
        setFilteredPatients(response.data); // Update filtered list with initial data
      })
      .catch((error) => console.error("Error fetching patients:", error)); // Handle API errors
  }, [token]);

  // Effect hook to load patients when the component mounts
  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  //converting the object file as string so that it cannbe displayed on the web...
  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const base64String = reader.result;
      localStorage.setItem('profilePhoto', base64String); // Store base64 string in localStorage
      setProfilePhoto(base64String); // Update state with base64 string
    };
  
    if (file) {
      reader.readAsDataURL(file); // Convert the file to a base64 string
    }
  };
  


  useEffect(() => {
    const storedProfilePhoto = localStorage.getItem('profilePhoto');
    console.log("Stored Profile Photos:", storedProfilePhoto); // Debug log
    if (storedProfilePhoto) {
      setProfilePhoto(storedProfilePhoto);
    }
  }, []);
  
  

  // Function to update patient details via API
  const updatePatient = (patientId, updatedData) => {
    const payload = {
      firstName: updatedData.firstName || '',
      lastName: updatedData.lastName || '',
      email: updatedData.email || '',
      phone: updatedData.phone || '',
      gender: updatedData.gender || 'Male',
      birthDate: updatedData.birthDate || '',
      maritalStatus: updatedData.maritalStatus || 'Single',
      medicalHistory: updatedData.medicalHistory || '',
      medications: updatedData.medications || '',
      summaryReport: updatedData.summaryReport || '',
      reasonForConsultation: updatedData.reasonForConsultation || '',
      visitDate: updatedData.visitDate || '',
      nextAppointmentDate: updatedData.nextAppointmentDate || '',
    };

    axiosInstance
      .put(`/patients/${patientId}`, payload, {
        headers: { "x-access-token": token, "Content-Type": "application/json" }, // Include headers
      })
      .then(() => {
        loadPatients(); // Reload patient list after update
      })
      .catch((error) => console.error("Error updating patient:", error)); // Handle API errors
  };

  // Function to delete a patient via API
  const deletePatient = (patientId) => {
    if (window.confirm("Are you sure you want to delete this patient?")) { // Confirm deletion
      axiosInstance
        .delete(`/patients/${patientId}`, { headers: { "x-access-token": token } }) // API call to delete patient
        .then(() => {
          setPatients((prev) => prev.filter((p) => p._id !== patientId)); // Remove patient from state
          setFilteredPatients((prev) => prev.filter((p) => p._id !== patientId)); // Update filtered list
        })
        .catch((error) => console.error("Error deleting patient:", error)); // Handle API errors
    }
  };

  // JSX for rendering the dashboard component
  return (
    <div className="flex flex-col items-start justify-start w-full h-full gap-20 px-10 py-10">
      <div className="flex flex-col gap-14 w-full">
      <div>
          <h2 className="text-4xl font-semibold">Hi {name}</h2>
          {profilePhoto ? (
            <img
              src={profilePhoto} // Display profile photo if available
              alt="User Profile"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%", // Make the photo rounded
                objectFit: "cover", // Ensure the photo covers the circular area properly
              }}
            />
          ) : (
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              {name?.charAt(0)?.toUpperCase() || "U"} {/* Placeholder for profile photo */}
            </div>
          )}
          <h2 className="text-xs font-semibold mt-2 opacity-50">Welcome Back to Dashboard Manager 2024 Dec</h2>
        </div>
        <div className="flex justify-between items-center w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePhotoUpload} // File input for uploading profile photo
            className="mb-4"
          />

         
          
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-5 items-center relative" id="search">
            <img
              src="icons/search.svg"
              alt="search icon"
              className="absolute right-3"
            />
            <input
              type="text"
              name="search"
              className="p-3 rounded-xl w-96 pl-10 focus:outline-secondary border border-primary focus:ring-secondary focus:border-secondary"
              placeholder="Search..." // Search bar for filtering patients
              value={query}
              onChange={handleChangeSearchBar}
            />
          </div>
          <button
            className="rounded-xl bg-secondary text-white font-semibold text-lg px-5 py-3"
            onClick={() => {
              window.location.href = "/addpatient"; // Redirect to add patient page
            }}
          >
            Add a Patient
          </button>
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-2xl font-semibold">Patient Table</h2>
        <div className="overflow-hidden max-h-[230px] overflow-y-auto custom-scroll py-2 mt-3">
          <table className="w-full">
            <thead className="border-b-2 border-gray-200">
              <tr className="text-gray-500 text-sm font-semibold">
                {/* Table headers for patient details */}
                <th className="text-left">FullName</th>
                <th className="text-left">Gender</th>
                <th className="text-left">BirthDate</th>
                <th className="text-left">PhoneNo</th>
                <th className="text-left">Email</th>
                <th className="text-left">Marital Status</th>
                <th className="text-left">Medical History</th>
                <th className="text-left">Medications</th>
                <th className="text-left">Reason for Consultation</th>
                <th className="text-left">Visit Date</th>
                <th className="text-left">Next Appointment</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient._id} // Key for each row to ensure unique identification
                  className="border-b-2 border-gray-200 text-sm font-semibold cursor-pointer hover:bg-gray-50 transition-all duration-200"
                >
                  {/* Table data for each patient */}
                  <td className="py-5">
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td className="py-5">{patient.gender}</td>
                  <td className="py-5">{patient.birthDate}</td>
                  <td className="py-5">{patient.phone}</td>
                  <td className="py-5">{patient.email}</td>
                  <td className="py-5">{patient.maritalStatus}</td>
                  <td className="py-5">{patient.medicalHistory}</td>
                  <td className="py-5">{patient.medications}</td>
                  <td className="py-5">{patient.reasonForConsultation}</td>
                  <td className="py-5">{patient.visitDate}</td>
                  <td className="py-5">{patient.nextAppointmentDate}</td>
                  <td className="py-5">
                    <button
                      className="bg-secondary text-white font-semibold px-4 py-2 rounded-lg"
                      onClick={() => {
                        setIsEditing(true); // Enable edit mode
                        setCurrentPatient(patient); // Set current patient to be edited
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg ml-2"
                      onClick={() => deletePatient(patient._id)} // Trigger patient deletion
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditing && ( // Render patient edit form if editing is enabled
        <PatientEditForm
          patient={currentPatient} // Pass current patient details to the form
          onSave={(updatedData) => { // Renaming onUpdate to onSave if desired
            updatePatient(currentPatient._id, updatedData); // Update patient details on form submission
            setIsEditing(false); // Disable edit mode
          }}
          onCancel={() => setIsEditing(false)} // Cancel editing
        />
      )}
    </div>
  );
};

// Export the Dashboard component as default
export default Dashboard;
