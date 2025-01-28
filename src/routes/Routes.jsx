import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/Signin.jsx";
import Signup from "../pages/Signup.jsx";
import Home from "../pages/Home.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import ForgetPassword from "../pages/ForgetPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import Help from "../pages/Help.jsx";
import AppointmentForm from '../components/Home/Dashboard/appointment.jsx';
import VisitList from '../components/visitList';
import VisitDetail from '../components/visitDetails';
import PrescriptionDetail from '../components/prescriptionDetails';


const Routers = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/dashboard" element={<Home />}></Route>
      <Route path="/history" element={<Home />}></Route>
      <Route path="/addpatient" element={<Home />}></Route>
      <Route path="/patient/:id" element={<Home />}></Route>
      <Route path="/profile" element={<Home />}></Route>
      <Route path="/password" element={<Home />}></Route>
      <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/help" element={<Help />} />
      <Route path="/appointments/:patientId/:appointmentId" element={<AppointmentForm />} />
      <Route path="/patient/:patientId/visits" exact element={VisitList} />
      <Route path="/patient/:patientId/visit/:visitId" exact elememt={VisitDetail} />
      <Route path="/patient/:patientId/visit/:visitId/prescription/:prescriptionId" exact element={PrescriptionDetail} />

      
    </Routes>
  );
};

export default Routers;