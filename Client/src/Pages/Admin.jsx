import React, { useState, useEffect } from "react";
import adminServices from "../api/admin.js";

const Admin = () => {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [ticketsPurchased, setTicketsPurchased] = useState(0);
  const [registeredUsers, setRegisteredUsers] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedUsers, totalUsers, totalRegistrations] =
          await Promise.all([
            adminServices.getUsers(),
            adminServices.getTotalUsers(),
            adminServices.getTotalEventRegistrations(),
          ]);

        setTotalVisitors(totalRegistrations.totalVisitors || 0);
        setTicketsPurchased(totalRegistrations.totalRegistrations || 0);
        setRegisteredUsers(totalUsers.totalUserRegistrations || 0);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        alert("Failed to load admin data.");
      }
    };

    fetchData();
  }, [totalVisitors, ticketsPurchased, registeredUsers]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Visitors
          </h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {totalVisitors}
          </p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">
            Tickets Purchased
          </h2>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {ticketsPurchased}
          </p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg ">
          <h2 className="text-xl font-semibold text-gray-700">
            Registered Users
          </h2>
          <p className="text-4xl font-bold text-purple-600 mt-2">
            {registeredUsers}
          </p>
        </div>
      </div>

      {/* User Table */}
      <div className="mt-8 bg-white p-6 shadow rounded-lg ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          User Details
        </h2>
        {users.length > 0 ? (
          <table className="w-full text-left border-collapse ">
            <thead>
              <tr>
                <th className="border-b-2 p-4">TID</th>
                <th className="border-b-2 p-4">Name</th>
                <th className="border-b-2 p-4">College</th>
                <th className="border-b-2 p-4">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.T_ID}>
                  <td className="border-b p-4">{user.T_ID}</td>
                  <td className="border-b p-4">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border-b p-4">{user.userType}</td>
                  <td className="border-b p-4">{user.emailID}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
