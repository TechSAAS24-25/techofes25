import axios from "../helper/axios";
import storage from "../services/storage";

const loginUrl = "/api/auth/login";
const registerUrl = "/api/auth/register";
const logoutUrl = "/api/auth/logout";
const sendOtpUrl = "/api/auth/register/send-otp";
const verifyOtpUrl = "/api/auth/register/verify-otp";

// Login user
const login = async (username, password) => {
  try {
    const response = await axios.post(loginUrl, { username, password });
    storage.saveUser(response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Login failed. Please try again." };
  }
};

// Register user
const register = async (user) => {
  try {
    const response = await axios.post(registerUrl, user);
    console.log("User registration response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Registration failed. Please try again." };
  }
};

// Send OTP
const sendOtp = async (phoneNumber) => {
  try {
    const response = await axios.post(sendOtpUrl, { phoneNumber });
    console.log("OTP sent successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error.response?.data || error.message);
    throw error.response?.data || { error: "Failed to send OTP. Please try again." };
  }
};

// Verify OTP
const verifyOtp = async (session, otp) => {
  try {
    const response = await axios.post(verifyOtpUrl, { session, otp });
    console.log("OTP verification response:", response.data);
    return response.data;
  } catch (error) {
    console.error("OTP verification error:", error.response?.data || error.message);
    throw error.response?.data || { error: "OTP verification failed. Please try again." };
  }
};

// Logout user
const logout = async () => {
  try {
    const response = await axios.post(logoutUrl);
    storage.removeUser();
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error.response?.data || { error: "Logout failed. Please try again." };
  }
};

export default { login, register, sendOtp, verifyOtp, logout };
