// import React from "react";
// import { useLocation } from "react-router-dom";

// const UserProfile = () => {

//   const location = useLocation();
//   const UserEmail = location.state?.email; // Retrieve the passed email
//   console.log("retrieved data ",UserEmail) ;

//   const userDetails = {
//     fullName: "John Doe",
//     email: "john.doe@example.com",
//     phone: "+1234567890",
//     address: "123, Main Street, Springfield",
//     dob: "1990-01-01",
//   };

//   userDetails.email = UserEmail ;
  

//   const appointmentHistory = [
//     {
//       id: 1,
//       doctorName: "Dr. Emily Smith",
//       date: "5th Jan 2025",
//       time: "10:00 AM",
//       specialist: "Dermatologist",
//       status: "Completed",
//     },
//     {
//       id: 2,
//       doctorName: "Dr. John Watson",
//       date: "6th Jan 2025",
//       time: "2:00 PM",
//       specialist: "Cardiologist",
//       status: "Scheduled",
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen p-6 flex items-center justify-center">
//       <div className="max-w-7xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
//         {/* Main Container with Two Rows */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
//           {/* Personal Details Section */}
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
//               Personal Details
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <p className="text-gray-700">
//                   <span className="font-medium">Full Name:</span>{" "}
//                   {userDetails.fullName}
//                 </p>
//                 <p className="text-gray-700">
//                   <span className="font-medium">Email:</span>{" "}
//                   {userDetails.email}
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-gray-700">
//                   <span className="font-medium">Phone:</span>{" "}
//                   {userDetails.phone}
//                 </p>
//                 <p className="text-gray-700">
//                   <span className="font-medium">Date of Birth:</span>{" "}
//                   {userDetails.dob}
//                 </p>
//               </div>
//             </div>
//             <p className="text-gray-700 mt-4">
//               <span className="font-medium">Address:</span>{" "}
//               {userDetails.address}
//             </p>
//           </div>

//           {/* Appointment History Section */}
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
//               Appointment History
//             </h2>
//             <div className="space-y-6">
//               {appointmentHistory.map((appointment) => (
//                 <div
//                   key={appointment.id}
//                   className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
//                 >
//                   <div className="flex justify-between">
//                     <div>
//                       <p className="text-gray-700 font-semibold">
//                         Doctor: {appointment.doctorName}
//                       </p>
//                       <p className="text-gray-600">
//                         Specialist: {appointment.specialist}
//                       </p>
//                       <p className="text-gray-600">Date: {appointment.date}</p>
//                       <p className="text-gray-600">Time: {appointment.time}</p>
//                     </div>
//                     <div>
//                       <p
//                         className={`text-sm font-medium ${
//                           appointment.status === "Completed"
//                             ? "text-green-500"
//                             : "text-blue-500"
//                         }`}
//                       >
//                         {appointment.status}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Edit Profile Button */}
//         <div className="text-center py-4">
//           <button className="px-8 py-3 bg-[#00A9E0] text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200">
//             Edit Profile
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const location = useLocation();
  //const UserEmail = location.state?.email; // Retrieve the passed email
  const UserEmail = localStorage.getItem("userEmail");
  const status = localStorage.getItem("status") ;

  console.log("Retrieved email: ", UserEmail);
  console.log("Retrieved status: ",status);


  const [userDetails, setUserDetails] = useState([]) ;
  const [appointmentHistory, setAppointmentHistory] = useState([]); // State for appointment data
  const [error, setError] = useState(null); // State for handling errors

  const dummyUserDetails = {
    fullName: "John Doe",
    email: UserEmail, // Set the email dynamically
    phone: "+1234567890",
    address: "123, Main Street, Springfield",
    dob: "1990-01-01",
  };
  // "user_id": 0,
  // "email": "string",
  // "password": "string",
  // "user_name": "string",
  // "loginStatus": "string"

  // Fetch appointment data on component load
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:9191/api/v1/newappointments/getAppointments?email=${encodeURIComponent(
            UserEmail
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointment data");
        }

        const data = await response.json();
        setAppointmentHistory(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Unable to load appointment data. Please try again.");
      }
    };

    if (UserEmail) {
      fetchAppointments();
    }
  }, [UserEmail]);


// Fetch appointment data on component load
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:9191/api/v1/newappointments/getAppointments?email=${encodeURIComponent(
            UserEmail
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointment data");
        }

        const data = await response.json();
        setAppointmentHistory(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Unable to load appointment data. Please try again.");
      }
    };

    if (UserEmail) {
      fetchAppointments();
    }
  }, [UserEmail]);


  // Fetch appointment data on component load
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:9191/api/v1/user/getUser?email=${encodeURIComponent(
            UserEmail
          )}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointment data");
        }

        const data = await response.json();
        setUserDetails(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Unable to load appointment data. Please try again.");
      }
    };

    if (UserEmail) {
      fetchUserDetails();
    }
  }, [UserEmail]);




  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-50 to-teal-100 min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-7xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Main Container with Two Rows */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Personal Details Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Full Name:</span>{" "}
                  {userDetails.user_name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span>{" "}
                  {userDetails.email}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span>{" "}
                  {dummyUserDetails.phone}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Date of Birth:</span>{" "}
                  {dummyUserDetails.dob}
                </p>
              </div>
            </div>
            <p className="text-gray-700 mt-4">
              <span className="font-medium">Address:</span>{" "}
              {dummyUserDetails.address}
            </p>
          </div>

          {/* Appointment History Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
              Appointment History
            </h2>

            {error ? (
              <p className="text-red-500 text-sm">{error}</p>
            ) : (
              <div className="space-y-6">
                {appointmentHistory.length > 0 ? (
                  appointmentHistory.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="text-gray-700 font-semibold">
                            Patient Name: {appointment.patientName}
                          </p>
                          <p className="text-gray-600">
                            Contact: {appointment.contactNumber}
                          </p>
                          <p className="text-gray-600">
                            Appointment Date:{" "}
                            {new Date(appointment.appointmentDate).toLocaleString()}
                          </p>
                          <p className="text-gray-600">Doctor ID: {appointment.doctorId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-500 font-medium">
                            Appointment ID: {appointment.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No appointments found.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="text-center py-4">
          <button className="px-8 py-3 bg-[#00A9E0] text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-200">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
