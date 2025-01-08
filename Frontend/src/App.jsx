// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AppointmentBookingCart from "./Components/AppointmentBookingCart";
import Home from "./Pages/Home";
import Doctors from "./Pages/Doctors";
import ApplyDoctorForm from "./Pages/ApplyDoctorForm";
import YourAppointments from "./Pages/YourAppointments";
import ContactUs from "./Pages/ContactUs";
import SignUp from "./Pages/SignUp";
import UserProfile from "./Pages/UserProfile";
import Store from "./Pages/Store";
import Login from './Pages/Login';
import DiseaseChecker from "./Pages/DiseaseChecker";
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/apply" element={<ApplyDoctorForm />} />
            <Route path="/appointments" element={<YourAppointments />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/store" element={<Store />} />
            <Route path="/login" element={<Login />} />
            <Route path="/disease-checker" element={<DiseaseChecker />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;