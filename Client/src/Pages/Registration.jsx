import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../api/auth";
import showToast from "../components/toastNotifications";
import { Eye, EyeOff } from "lucide-react";
import "../Styles/Registration.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    rollno: "",
    college: "",
    usertype: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });
  
  const [otpSent, setOtpSent] = useState(false);
  const [otpSession, setOtpSession] = useState(null);
  const [registering, setRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSendOtp = async () => {
    try {
      const response = await authServices.sendOtp(formData.mobile);
      setOtpSession(response.session);
      setOtpSent(true);
      showToast("success", "OTP sent successfully.");
    } catch (error) {
      showToast("error", error.error || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await authServices.verifyOtp(otpSession, formData.otp);
      showToast("success", "OTP verified successfully.");
      handleRegister();
    } catch (error) {
      showToast("error", error.error || "OTP verification failed.");
    }
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      showToast("warning", "Passwords don't match.");
      return;
    }
    
    if (formData.usertype === "Insider" && !formData.rollno) {
      showToast("warning", "Roll Number is required for Insider user type.");
      return;
    }
    
    try {
      setRegistering(true);
      const userData = {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phn: formData.mobile,
        type: formData.usertype,
        rollno: formData.usertype === "Insider" ? formData.rollno : undefined,
        college: formData.college,
      };
      
      const response = await authServices.register(userData);
      showToast("success", `Registration Successful: ${response.message}\nTID: ${response.user.T_ID}`);
      
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      showToast("error", error.error || "Registration failed.");
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className="registration-page">
      <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default submission */}
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" required />
        {!otpSent ? (
          <button type="button" onClick={handleSendOtp}>Send OTP</button>
        ) : (
          <>
            <input type="text" name="otp" value={formData.otp} onChange={handleChange} placeholder="Enter OTP" required />
            <button type="button" onClick={handleVerifyOtp}>Verify OTP</button>
          </>
        )}
        {otpSent && (
          <>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
            <button type="submit" onClick={handleRegister} disabled={registering}>
              {registering ? "Registering..." : "Sign Up"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default Registration;
