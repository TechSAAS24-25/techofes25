import axios from "../helper/axios";
import storage from "../services/storage";
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const loginUrl = "/api/auth/login";
const registerUrl = "/api/auth/register";
const logoutUrl = "/api/auth/logout";
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

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

// Initialize Recaptcha
const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => console.log("Recaptcha Verified"),
    });
  }
};

// Function to send OTP
const sendOtp = async (phoneNumber) => {
  try {
    setupRecaptcha();
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    window.confirmationResult = confirmationResult; // Save for verification step
    console.log("OTP sent successfully");
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};


const verifyOtp = async (otp) => {
  try {
    if (!window.confirmationResult) {
      throw new Error("No OTP session found. Please request a new OTP.");
    }

    // Verify the OTP using Firebase
    const userCredential = await window.confirmationResult.confirm(otp);
    const idToken = await userCredential.user.getIdToken(); // Get ID token

    console.log("OTP verified successfully", userCredential.user);
    
    // Send the ID token to the backend for authentication
    const response = await axios.post(verifyOtpUrl, { idToken });
    
    return response.data; // Backend response (session cookie, user info, etc.)
  } catch (error) {
    console.error("OTP verification error:", error.message);
    throw new Error("Invalid OTP. Please try again.");
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
