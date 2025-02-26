import axios from "../helper/axios";
const eventsUrl = "/api/events";
import storage from "../services/storage";

// Get all events
const getEvents = async () => {
  try {
    const response = await axios.get(eventsUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Get a particular event
const getEvent = async (eventId) => {
  try {
    const response = await axios.get(`${eventsUrl}/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
};

// Register for an event (Admin approval required)
const registerEvent = async (eventId, T_ID, answer) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${storage.loadUser().token}`,
      },
    };

    const response = await axios.post(
      `${eventsUrl}/${eventId}/register`,
      { T_ID, answer },
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error registering for event:", error);
    throw error;
  }
};

// Register a user for all general events (T_ID must end with "CEG")
const registerForGeneralEvents = async (T_ID) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${storage.loadUser().token}`,
      },
    };

    const response = await axios.post(
      `${eventsUrl}/register/general`,
      { T_ID },
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error registering for general events:", error);
    throw error;
  }
};


// Register CEG Users for Sports Events
const registerForSportsEvents = async (eventId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${storage.loadUser().token}`,
      },
    };

    const response = await axios.post(
      `${eventsUrl}/${eventId}/register/sports`,
      eventId,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error registering for sports events:", error);
    throw error;
  }
};

// Check Registration & Payment Status
const registerStatus = async (eventId) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${storage.loadUser().token}`,
      },
    };

    const response = await axios.get(`${eventsUrl}/${eventId}/status`, config);
    return response.data;
  } catch (error) {
    console.error("Error checking registration status:", error);
    throw error;
  }
};

const payForEvent = async (eventId, transactionId, screenshotFile) => {
  try {
    // Convert image to Base64
    const encodeImageToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]); // Extract Base64
        reader.onerror = (error) => reject(error);
      });
    };

    const base64Image = await encodeImageToBase64(screenshotFile);

    const requestData = {
      T_ID: "CEG2025000002", // Example T_ID
      transactionId,
      screenshot: base64Image, // Base64 encoded image
      fileType: screenshotFile.type, // Send file type for decoding
    };

    console.log("Payload before sending:", requestData);

    const config = {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storage.loadUser().token}`,
      },
    };

    const response = await axios.post(
      `${eventsUrl}/${eventId}/pay`,
      requestData,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error making payment:", error.response?.data || error);
    return error;
  }
};

export default {
  getEvents,
  getEvent,
  registerEvent,
  registerStatus,
  payForEvent,
  registerForGeneralEvents,
  registerForSportsEvents,
};
