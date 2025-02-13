import React, { useState, useEffect } from "react";
import userServices from "../api/users.js";
import { useNavigate } from "react-router-dom";
import storage from "../services/storage";
import foodBackground from "../assets/team.jpeg";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [payments, setPayemnts] = useState([]);
  const navigate = useNavigate();

  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const user = storage?.loadUser();
    setIsLoggedIn(!!user);

    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Fetch user profile
        const profileData = await userServices.getProfile();
        setUserData(profileData);

        // Fetch registered events
        const registrations = await userServices.getRegistrations();
        setRegisteredEvents(registrations);

        const paymentsData = await userServices.getPayments();
        setPayemnts(paymentsData);
        console.log(paymentsData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      navigate("/login");
    } else {
      fetchUserData();
    }
  }, [navigate]);

  if (loading) {
    return <div className="text-center text-6xl text-black">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Categorize payments by status
  const pendingPayments = payments?.filter(
    (payment) => payment.status === "pending"
  );
  const rejectedPayments = payments?.filter(
    (payment) => payment.status === "rejected"
  );
  const approvedPayments = payments?.filter(
    (payment) => payment.status === "approved"
  );

  return (
    <div
      className="flex justify-center items-center py-8 px-4 bg-gradient-to-r from-orange-700 via-pink-400 to-blue-600"
      style={{ height: "180vh", 
        backgroundImage: `url(${foodBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center" }}
    >
      <div className=" bg-black bg-opacity-20 backdrop-blur-lg text-black rounded-lg w-full max-w-5xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">
            Registration Details
          </h1>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-white">
            TID: {userData?.T_ID}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="text-base bg-[#371426] text-white p-4 rounded-lg shadow-sm">
            <label className="font-semibold text-white">Username</label>
            <p className="text-white mt-2">{userData?.username}</p>
          </div>

          <div className="text-base bg-[#371426] text-white p-4 rounded-lg shadow-sm">
            <label className="font-semibold text-white">Full Name</label>
            <p className="text-white mt-2">
              {userData?.firstName} {userData?.lastName}
            </p>
          </div>

          <div className="text-base bg-[#371426] text-white p-4 rounded-lg shadow-sm overflow-x-auto">
            <label className="font-semibold text-white">Email</label>
            <p className="text-white mt-2">{userData?.emailID}</p>
          </div>

          <div className="text-base bg-[#371426] text-white p-4 rounded-lg shadow-sm">
            <label className="font-semibold text-white">Mobile</label>
            <p className="text-white mt-2">{userData?.phoneNumber}</p>
          </div>

          {/* Conditionally render Roll Number if available */}
          {userData?.rollNo && (
            <div className="text-base bg-[#371426] text-white p-4 rounded-lg shadow-sm">
              <label className="font-semibold text-white">Roll Number</label>
              <p className="text-white mt-2">{userData?.rollNo}</p>
            </div>
          )}

          <div className="text-base bg-[#371426] text-white p-4 rounded-lg shadow-sm">
            <label className="font-semibold text-white">User Type</label>
            <p className="text-white mt-2">{userData?.userType}</p>
          </div>

          {/* Registered Events */}
          <div className="col-span-2 mt-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Registered Events
            </h2>
            {registeredEvents.length > 0 ? (
              <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-scroll overflow-x-clip"
                style={{ height: "20vh", scrollbarWidth: "thin" }}
              >
                {registeredEvents.map((event) => (
                  <div
                    key={event.registrationID}
                    className="bg-[#2d1122] p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
                  >
                    <div className="font-semibold text-xl text-white mb-2">
                      {event.eventName}
                    </div>
                    <div className="text-gray-300 mb-2">
                      <strong>Category:</strong> {event.category}
                    </div>
                    <div className="text-gray-300 mb-2">
                      <strong>Event Date:</strong>{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="text-gray-300 mb-2">
                      <strong>Location:</strong> {event.location}
                    </div>
                    <div className="text-gray-300 mb-2">
                      <strong>Registration ID:</strong> {event.registrationID}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white">No events registered yet.</p>
            )}
          </div>

          {/* Payments Section */}
          {[
            {
              title: "Pending Payments",
              payments: pendingPayments,
              color: "bg-yellow-600",
            },
            {
              title: "Rejected Payments",
              payments: rejectedPayments,
              color: "bg-red-600",
            },
            {
              title: "Approved Payments",
              payments: approvedPayments,
              color: "bg-green-600",
            },
          ].map(({ title, payments, color }) => (
            <div className="col-span-2 mt-6" key={title}>
              <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
              {payments.length > 0 ? (
                <div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-scroll overflow-x-clip"
                  style={{ height: "20vh", scrollbarWidth: "thin" }}
                >
                  {payments.map((payment) => (
                    <div
                      key={payment.registrationID}
                      className={`${color} p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300`}
                    >
                      <div className="font-semibold text-xl text-black mb-2">
                        Event: {payment.eventName || "Unknown"}
                      </div>
                      <div className="text-black mb-2">
                        <strong>Registration Fees:</strong> ₹{payment.amount}
                      </div>
                      <div className="text-black mb-2">
                        <strong>Date:</strong>{" "}
                        {new Date(payment.date).toLocaleDateString()}
                      </div>
                      <div className="text-black mb-2">
                        <strong>Category:</strong> {payment.category}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white">No {title.toLowerCase()}.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
