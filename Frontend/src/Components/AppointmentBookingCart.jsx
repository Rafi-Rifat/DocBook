import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Set up modal styling
Modal.setAppElement("#root");

const AppointmentBookingCart = ({ doctor, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    contactNumber: "",
    email:"",
    appointmentDate: new Date(),
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle date picker changes
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      appointmentDate: date,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Doctor Info:", doctor);
    try {
        const response = await fetch('http://localhost:9191/api/v1/newappointments/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          doctorId: doctor.id, // Include doctor information
         }),
        });
        if (!response.ok) throw new Error('Failed to submit appointment');
        const result = await response.json();
        console.log('Appointment confirmed:', result);
        onClose(); // Close modal on success
    } catch (error) {
      console.error('Error submitting appointment:', error);
    }

    onClose(); // Close the modal after submission
  };

  return (
    <Modal
      isOpen={!!doctor}
      onRequestClose={onClose}
      style={{
        content: {
          maxWidth: "500px",
          margin: "auto",
          padding: "20px",
          borderRadius: "15px",
          backgroundColor: "#f9fafb", // Light background
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
        },
      }}
    >
      <h2 className="text-2xl font-bold text-teal-600 mb-4 text-center">
        Book an Appointment with Dr. {doctor.name}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Patient Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Patient Name:
          </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-400 rounded-lg focus:ring focus:ring-teal-300 outline-none"
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Email :
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-400 rounded-lg focus:ring focus:ring-teal-300 outline-none"
            placeholder="Enter your email "
          />
        </div>
        {/* Contact Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Contact Number:
          </label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-400 rounded-lg focus:ring focus:ring-teal-300 outline-none"
            placeholder="Enter your contact number"
          />
        </div>

        {/* Appointment Date */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Appointment Date:
          </label>
          <DatePicker
            selected={formData.appointmentDate}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="Pp"
            className="w-full px-4 py-2 border border-teal-400 rounded-lg focus:ring focus:ring-teal-300 outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-6 py-2 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AppointmentBookingCart;
