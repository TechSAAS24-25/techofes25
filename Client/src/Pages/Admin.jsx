import React, { useState, useEffect } from "react";
import adminServices from "../api/admin.js";
import eventServices from "../api/events.js";
import showToast from "../components/toastNotifications";
import storage from "../services/storage";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const Admin = () => {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [ticketsPurchased, setTicketsPurchased] = useState(0);
  const [registeredUsers, setRegisteredUsers] = useState(0);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingRegs, setLoadingRegs] = useState(false);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState({});
  const [processingPayment, setProcessingPayment] = useState(null);
  const [regs, setRegs] = useState({});
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

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const fetchedUsers = await adminServices.getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast("error", "Failed to load user data.");
    }
    setLoadingUsers(false);
  };

  const fetchRegistrations = async () => {
    setLoadingRegs(true);
    try {
      const allRegs = await adminServices.getAllRegistrations();
      setRegs(allRegs || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      showToast("error", "Failed to load registrations.");
    }
    setLoadingRegs(false);
  };

  const handleApproval = async (payment, answer) => {
    setProcessingPayment(payment._id);
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

      toast.success(
        "success",
        `${answer === "Yes" ? "Approved" : "Rejected"} Payment`
      );

      setPayments((prevPayments) => {
        const updatedPendingPayments = prevPayments.pendingPayments.filter(
          (p) => p._id !== payment._id
        );
        // console.log(updatedPendingPayments);
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
      setProcessingPayment(null);
    } catch (error) {
      console.error("Error handling approval:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          // fetchedUsers,
          totalUsers,
          totalRegistrations,
          allPayments,
          // allRegs,
        ] = await Promise.all([
          // adminServices.getUsers(),
          adminServices.getTotalUsers(),
          adminServices.getTotalEventRegistrations(),
          adminServices.getAllPayments(),
          // adminServices.getAllRegistrations(),
        ]);

        setTotalVisitors(totalRegistrations.totalVisitors || 0);
        setTicketsPurchased(totalRegistrations.totalRegistrations || 0);
        setRegisteredUsers(totalUsers.totalUserRegistrations || 0);
        setPayments(allPayments || {});
        // setRegs(allRegs || []);
        // console.log(allRegs);
        // setUsers(fetchedUsers);
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
                      disabled={processingPayment === payment._id}
                    >
                      {processingPayment === payment._id
                        ? "Approving..."
                        : "Accept"}
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleApproval(payment, "No")}
                      disabled={processingPayment === payment._id}
                    >
                      {processingPayment === payment._id
                        ? "Rejecting..."
                        : "Reject"}
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

      {/* Fetch User Details Button */}
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={fetchUsers}
          disabled={loadingUsers}
        >
          {loadingUsers ? "Loading..." : "Fetch User Details"}
        </button>
      </div>

      {/* Fetch Registrations Button */}
      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={fetchRegistrations}
          disabled={loadingRegs}
        >
          {loadingRegs ? "Loading..." : "Fetch All Registrations"}
        </button>
      </div>

      {/* User Table */}
      <div className="mt-8 bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          User Details
        </h2>
        {users.length > 0 ? (
          <table className="w-full text-left border-collapse">
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
          <p className="text-gray-500">No user data available.</p>
        )}
      </div>

      {/* Registrations Table */}
      <div className="mt-8 bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          All Registrations
        </h2>
        {regs.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 p-4">Name</th>
                <th className="border-b-2 p-4">Type</th>
                <th className="border-b-2 p-4">Event Name</th>
                <th className="border-b-2 p-4">Event Type</th>
                <th className="border-b-2 p-4">Phone</th>
                <th className="border-b-2 p-4">Email</th>
              </tr>
            </thead>
            <tbody>
              {regs.map((registration) => (
                <tr key={registration._id}>
                  <td className="border-b p-4">{registration.userName}</td>
                  <td className="border-b p-4">{registration.userType}</td>
                  <td className="border-b p-4">{registration.eventName}</td>
                  <td className="border-b p-4">{registration.eventCategory}</td>
                  <td className="border-b p-4">{registration.phone}</td>
                  <td className="border-b p-4">{registration.userEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No registrations available.</p>
        )}
      </div>

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
