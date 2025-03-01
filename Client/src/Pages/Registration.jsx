import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import icecream from "../assets/food/icecream.gif";
import authServices from "../api/auth.js";
import logo from "../assets/logo.png";
import showToast from "../components/toastNotifications";
import { Eye, EyeOff } from "lucide-react";
import "../Styles/Registration.css";

const foodItems = ["🍕", "🍔", "🍩", "🍣", "🌮", "🥞", "🍪", "🍿"];

const Registration = () => {
  const [fallingFood, setFallingFood] = useState([]);
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
  const [registering, setRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const newFood = {
        id: Date.now(),
        type: foodItems[Math.floor(Math.random() * foodItems.length)],
        left: Math.random() * 100,
      };
      setFallingFood((prev) => [...prev, newFood]);

      setTimeout(() => {
        setFallingFood((prev) => prev.filter((item) => item.id !== newFood.id));
      }, 5000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSendOtp = async () => {
    if(!formData.mobile) {
      showToast("warning", "Mobile number is required.");
      return;
    }
    try {
      const response = await authServices.sendOtp(`+91${formData.mobile}`);
      if (response.success) {
        setOtpSent(true);
        showToast("success", "OTP sent successfully.");
      } else {
        showToast("error", response.message || "Failed to send OTP.");
      }
    } catch (error) {
      showToast("error", error.error || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await authServices.verifyOtp(formData.otp);
      showToast("success", "OTP verified successfully.");
      setOtpVerified(true);
    } catch (error) {
      showToast("error", error.error || "OTP verification failed.");
    }
  };

  const handleRegister = async () => {
    if (!otpVerified) {
      showToast("warning", "Please verify OTP first.");
      return;
    }
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
      <div className="left-section">
        <img src={logo} alt="Main Logo" className="h-auto max-h-40 w-auto max-w-xl mb-2" />
        <div className="background-food">
          {fallingFood.map((food) => (
            <div key={food.id} className="food-item" style={{ left: `${food.left}%` }}>
              {food.type}
            </div>
          ))}
        </div>
        <div className="video-frame">
          <img src={icecream} alt="Ice Cream Animation" />
        </div>
        <div className="button-group">
          <button className="nav-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="nav-btn active">Register</button>
        </div>
      </div>
      <div id="recaptcha-container"></div>
      <div className="right-form">
        <div className="form-card">
          <div className="header">
            <h1>Register</h1>
          </div>
          <form onSubmit={handleRegister}>
            <div className="grouped-input">
              <div className="input-group">
                <label>User Name</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
              </div>
            </div>
            <div className="grouped-input">
              <div className="input-group">
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div className="grouped-input">
              <div className="input-group">
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="grouped-input">
               <div className="input-group">
                <label>Mobile</label>
                <input type="text" name="mobile" value={formData.mobile} style={{ width: "210px" }} onChange={handleChange} required />
              </div>
            <div className="input-group">
            <button type="button" className="otp-btn" onClick={handleSendOtp} disabled={otpSent}>{otpSent ? "OTP Sent" : "Send OTP"}</button>
            </div>
            </div>
            <div className="grouped-input">
            {otpSent && (
              <>
            <div className="input-group">
              <label>OTP</label>
              <input type="text" name="otp" value={formData.otp} onChange={handleChange} placeholder="" required />
              </div>
              <button type="button" className="verify-btn" onClick={handleVerifyOtp} disabled={otpVerified}>{otpVerified ? "OTP Verified" : "Verify OTP"}</button>
              </>
          )}
          </div>
          <div className="grouped-input">
              <div className="input-group">
                <label>Password</label>
                <div className="password-input">
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
                  <button type="button" className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <div className="password-input">
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                  <button type="button" className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>
            <button type="submit" className="submit-btn" disabled={registering || !otpVerified}> {registering ? "Registering" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
