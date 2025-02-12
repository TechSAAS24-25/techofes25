import axios from "../helper/axios";
const profileUrl = "api/profile";
import storage from "../services/storage";

const token = storage?.loadUser()?.token;
const config = () => ({
  headers: { Authorization: `Bearer ${token}` },
});
//implement try and catch blocks for error handling in the frontend

// Get profile
// Returns a user object
// Refer server/models/user.js for the structure of a user object

const getProfile = async () => {
  const response = await axios.get(profileUrl, config());
  return response.data;
};

// get all events registered by the user
// Returns an array of registration object populated with event details
// Refer server/routes/users.js for the structure of a returned object

const getRegistrations = async () => {
  const response = await axios.get(`${profileUrl}/registrations`, config());
  return response.data;
};

// get all merchandise purchased by the user
// Returns an array of purchase object populated with merchandise details
// Refer server/routes/users.js for the structure of a returned object

const getPurchases = async () => {
  const response = await axios.get(`${profileUrl}/purchases`, config());
  return response.data;
};

// get all accommodations booked by the user
// Returns an array of booking object populated with accommodation details
// Refer server/routes/users.js for the structure of a returned object

const getAccommodations = async () => {
  const response = await axios.get(`${profileUrl}/accommodations`, config());
  return response.data;
};

const getPayments = async () => {
  const response = await axios.get(`${profileUrl}/payment`, config());
  return response.data;
};

export default {
  getProfile,
  getRegistrations,
  getPurchases,
  getPayments,
  getAccommodations,
};
