import React, { useState, useEffect } from "react";
import adminServices from "../api/admin.js";
import eventServices from "../api/events.js";
import showToast from "../components/toastNotifications";
import storage from "../services/storage";
import { useParams, useNavigate } from "react-router-dom";

const Admin = () => {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [ticketsPurchased, setTicketsPurchased] = useState(0);
  const [registeredUsers, setRegisteredUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const [visitorsCount, setVisitorsCount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const user = storage.loadUser();
    if (user.T_ID != "001") {
      navigate("/");
      showToast("error", "Only Admins can access Admin Dashboard");
    }

    const fetchVisitorCount = () => {
      const storedCount = sessionStorage.getItem("visitorsCount");
      let newCount = storedCount ? parseInt(storedCount) : 0;

      newCount += 1;
      setVisitorsCount(newCount);

      sessionStorage.setItem("visitorsCount", newCount);
    };

    fetchVisitorCount();
  }, []);

  const handleApproval = async (payment, answer) => {
    try {
      console.log(payment.eventId, payment.T_ID, answer);
      const response = await eventServices.registerEvent(
        payment.eventId,
        payment.T_ID,
        answer
      );
      console.log(
        `${answer === "Yes" ? "Approved" : "Rejected"}`,
        payment.T_ID
      );

      showToast(
        "success",
        `${answer === "Yes" ? "Approved" : "Rejected"} Payment`
      );

      setPayments((prevPayments) => {
        const updatedPendingPayments = prevPayments.pendingPayments.filter(
          (p) => p._id !== payment._id
        );
        const updatedApprovedPayments = [
          ...prevPayments.approvedPayments,
          {
            ...payment,
            status: answer === "Yes" ? "approved" : "rejected",
          },
        ];

        return {
          ...prevPayments,
          pendingPayments: updatedPendingPayments,
          approvedPayments: updatedApprovedPayments,
        };
      });
    } catch (error) {
      console.error("Error handling approval:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedUsers, totalUsers, totalRegistrations, allPayments] =
          await Promise.all([
            adminServices.getUsers(),
            adminServices.getTotalUsers(),
            adminServices.getTotalEventRegistrations(),
            adminServices.getAllPayments(),
          ]);

        setTotalVisitors(totalRegistrations.totalVisitors || 0);
        setTicketsPurchased(totalRegistrations.totalRegistrations || 0);
        setRegisteredUsers(totalUsers.totalUserRegistrations || 0);
        setPayments(allPayments || {});
        console.log(allPayments);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        showToast("error", "Failed to load admin data.");
      }
    };

    fetchData();
  }, [totalVisitors, ticketsPurchased, registeredUsers]);

  return (
    <div
      className="p-6 text-black bg-gray-100 min-h-screen"
      style={{ color: "black!important" }}
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Visitors
          </h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">
            {visitorsCount}
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

      {/* Payments Table */}
      <div className="mt-8 bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Pending Payments
        </h2>
        {payments.pendingPayments && payments.pendingPayments.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 p-4">Transaction ID</th>
                <th className="border-b-2 p-4">Name</th>
                <th className="border-b-2 p-4">Type</th>
                <th className="border-b-2 p-4">Event Name</th>
                <th className="border-b-2 p-4">Event Type</th>
                <th className="border-b-2 p-4">Screenshot</th>
                <th className="border-b-2 p-4">Phone</th>
                <th className="border-b-2 p-4">Email</th>
                <th className="border-b-2 p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.pendingPayments.map((payment) => (
                <tr key={payment._id}>
                  <td className="border-b p-4">{payment.transactionID}</td>
                  <td className="border-b p-4">{payment.userName}</td>
                  <td className="border-b p-4">{payment.userType}</td>
                  <td className="border-b p-4">{payment.eventName}</td>
                  <td className="border-b p-4">{payment.category}</td>
                  <td className="border-b p-4">
                    <img
                      src={payment.screenshotPath}
                      alt="Screenshot"
                      className="h-16 w-16 object-cover cursor-pointer"
                      onClick={() => setSelectedImage(payment.screenshotPath)}
                    />
                  </td>
                  <td className="border-b p-4">{payment.phone}</td>
                  <td className="border-b p-4">{payment.userEmail}</td>
                  <td className="border-b p-4 flex flex-col gap-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() => handleApproval(payment, "Yes")}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleApproval(payment, "No")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No pending payments.</p>
        )}
      </div>

      {/* Approved Table */}
      <div className="mt-8 bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Approved & Rejected Payments
        </h2>
        {payments.approvedPayments && payments.approvedPayments.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 p-4">Transaction ID</th>
                <th className="border-b-2 p-4">Name</th>
                <th className="border-b-2 p-4">Type</th>
                <th className="border-b-2 p-4">Event Name</th>
                <th className="border-b-2 p-4">Event Type</th>
                <th className="border-b-2 p-4">Screenshot</th>
                <th className="border-b-2 p-4">Phone</th>
                <th className="border-b-2 p-4">Email</th>
                <th className="border-b-2 p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.approvedPayments.map((payment) => (
                <tr key={payment._id}>
                  <td className="border-b p-4">{payment.transactionID}</td>
                  <td className="border-b p-4">{payment.userName}</td>
                  <td className="border-b p-4">{payment.userType}</td>
                  <td className="border-b p-4">{payment.eventName}</td>
                  <td className="border-b p-4">{payment.category}</td>
                  <td className="border-b p-4">
                    <img
                      src={payment.screenshotPath}
                      alt="Screenshot"
                      className="h-16 w-16 object-cover cursor-pointer"
                      onClick={() => setSelectedImage(payment.screenshotPath)}
                    />
                  </td>
                  <td className="border-b p-4">{payment.phone}</td>
                  <td className="border-b p-4">{payment.userEmail}</td>
                  <td
                    className={`border-b p-4 ${
                      payment.status === "approved"
                        ? "text-green-500"
                        : payment.status === "rejected"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {payment.status}
                  </td>{" "}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No pending payments.</p>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 object-contain"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Enlarged Screenshot"
            className="max-w-xl max-h-xl object-contain"
            style={{ height: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default Admin;
