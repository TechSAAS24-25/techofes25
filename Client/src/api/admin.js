import axios from "../helper/axios";
import storage from "../services/storage";
const adminUrl = "/api/admin";

// Get all user details
const getUsers = async () => {
  const response = await axios.get(
    `${adminUrl}/users`
    // {
    // headers: {
    //     Authorization: `Bearer ${storage.loadUser().token}`,
    //     },
    // }
  );
  return response.data;
};

// Get total number of user registrations
const getTotalUsers = async () => {
  const response = await axios.get(
    `${adminUrl}/totalusers`
    // {
    // headers: {
    //     Authorization: `Bearer ${storage.loadUser().token}`,
    //     },
    // }
  );
  return response.data;
};

// Get total number of registrations for a specific event
const getEventRegistrations = async (eventId) => {
  const response = await axios.get(
    `${adminUrl}/registrations/${eventId}`
    // {
    // headers: {
    //     Authorization: `Bearer ${storage.loadUser().token}`,
    //     },
    // }
  );
  return response.data;
};

// Get total number of registrations for all events
const getTotalEventRegistrations = async () => {
  const response = await axios.get(
    `${adminUrl}/totalregistrations`
    // {
    // headers: {
    //     Authorization: `Bearer ${storage.loadUser().token}`,
    //     },
    // }
  );
  return response.data;
};

const getAllPayments = async () => {
  try {
    const [pendingResponse, approvedResponse] = await Promise.all([
      axios.get(`${adminUrl}/payments/pending`),
      axios.get(`${adminUrl}/payments/approved`),
    ]);

    return {
      pendingPayments: pendingResponse.data?.message
        ? []
        : pendingResponse.data,
      approvedPayments: approvedResponse.data?.message
        ? []
        : approvedResponse.data,
    };
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};

const getAllRegistrations = async () => {
  try {
    const response = await axios.get(`${adminUrl}/registrations`);

    return response.data?.message
      ? [] // If there is a message (no registrations found), return an empty array
      : response.data; // Otherwise, return the list of registrations
  } catch (error) {
    console.error("Error fetching registrations:", error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export default {
  getUsers,
  getTotalUsers,
  getEventRegistrations,
  getTotalEventRegistrations,
  getAllPayments,
  getAllRegistrations,
};
