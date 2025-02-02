import axios from "../helper/axios"; 
const eventsUrl = "/api/events";
import storage from "../services/storage";

//implement try and catch blocks for error handling in the frontend

// Get all events
// Returns an array of event objects
// Refer backend models for the structure of an event object

const getEvents = async () => {
  const response = await axios.get(eventsUrl);
  return response.data;
};

// Get a particular event
// Returns an event object
// Refer backend models for the structure of an event object

const getEvent = async (eventId) => {
  const response = await axios.get(`${eventsUrl}/${eventId}`);
  return response.data;
};

// Register for an event
// Returns a registration object and a message
// Refer backend models for the structure of a registration object

const registerEvent = async (eventId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${storage.loadUser().token}`,
    },
  };

  // Fix: Pass an empty body object {} as the second argument if there's no request body
  const response = await axios.post(
    `${eventsUrl}/${eventId}/register`,
    {},
    config
  );
  return response.data;
};

const registerStatus = async (eventId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${storage.loadUser().token}`,
    },
  };

  // Fix: Pass an empty body object {} as the second argument if there's no request body
  const response = await axios.get(`${eventsUrl}/${eventId}/status`, config);
  return response.data;
};

export default { getEvents, getEvent, registerEvent, registerStatus };
