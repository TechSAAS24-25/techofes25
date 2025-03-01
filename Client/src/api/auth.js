import axios from "../helper/axios";
import storage from "../services/storage";
import { auth } from "../config/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const loginUrl = "/api/auth/login";
const registerUrl = "/api/auth/register";
const logoutUrl = "/api/auth/logout";
// const verifyOtpUrl = "/api/auth/register/verify-otp";

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

// setup Recaptcha
const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA Verified:", response);
        },
        "expired-callback": () => {
          console.error("reCAPTCHA expired. Please refresh the page.");
        },
      },
      auth // ✅ Ensure `auth` is passed correctly
    );

    window.recaptchaVerifier.render()
      .then((widgetId) => {
        console.log("reCAPTCHA widget ID:", widgetId);
      })
      .catch((error) => console.error("reCAPTCHA render error:", error));
  }
};

// Function to send OTP
const sendOtp = async (phoneNumber) => {
  try {
    setupRecaptcha();

    // Ensure reCAPTCHA is fully loaded
    const recaptchaId = await recaptchaVerifier.render();
    console.log("reCAPTCHA rendered:", recaptchaId);

    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    window.confirmationResult = confirmationResult;

    console.log("OTP sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, message: error.message };
  }
};

// Function to verify OTP
const verifyOtp = async (otp) => {
  try {
    if (!window.confirmationResult) {
      throw new Error("No OTP session found. Please request a new OTP.");
    }

    const userCredential = await window.confirmationResult.confirm(otp);
    const idToken = await userCredential.user.getIdToken();

    console.log("OTP verified successfully", userCredential.user);

    return { success: true, idToken };
  } catch (error) {
    console.error("OTP verification error:", error.message);
    return { success: false, message: "Invalid OTP. Please try again." };
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
