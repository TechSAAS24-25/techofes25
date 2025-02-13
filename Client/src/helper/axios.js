// axios.js
import Axios from "axios";

const axios = Axios.create({});

export const baseURL = "https://techofes25.onrender.com";

axios.defaults.timeout = 120000; // Milliseconds
axios.interceptors.request.use(
  async function (config) {
    // Retreive token from Redux OR localStorage or ....
    config.headers["Content-Type"] = "application/json";
    config.credentials = "same-origin";
    config.baseURL = baseURL;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error?.response?.status === 403) {
      // Handle forbidden error
    }
    if (error?.response?.status === 401) {
      // Handle unauthorized error (e.g., log out the user)
    }
    throw error; // Propagate the error
  }
);

export default axios;
