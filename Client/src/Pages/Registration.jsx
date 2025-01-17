import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Registration.css";
import icecream from "../assets/food/icecream.gif";

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
    usertype: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const newFood = {
        id: Date.now(),
        type: foodItems[Math.floor(Math.random() * foodItems.length)],
        left: Math.random() * 100,
      };
      setFallingFood((prev) => [...prev, newFood]);

      // Remove food after 5 seconds
      setTimeout(() => {
        setFallingFood((prev) => prev.filter((item) => item.id !== newFood.id));
      }, 5000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="registration-page">
      {/* Left Section */}
      <div className="left-section">
        <div className="background-food">
          {fallingFood.map((food) => (
            <div
              key={food.id}
              className="food-item"
              style={{ left: `${food.left}%` }}
            >
              {food.type}
            </div>
          ))}
        </div>
        <div className="video-frame">
          <img src={icecream} alt="Ice Cream Animation" />
        </div>
        <div className="button-group">
          <button className="nav-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="nav-btn active">Register</button>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="right-form">
        <div className="form-card">
          <div className="header">
            <h1>Register</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grouped-input">
              <div className="input-group">
                <label>User Name</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grouped-input">
              <div className="input-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grouped-input">
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grouped-input">
              <div className="input-group">
                <label>Roll Number</label>
                <input
                  type="text"
                  name="rollno"
                  value={formData.rollno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>User Type</label>
                <select
                  name="usertype"
                  value={formData.usertype}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                  Select User Type
                  </option>
                  <option value="Insider">Insider</option>
                  <option value="Outsider">Outsider</option>
                </select>
              </div>
            </div>
            <div className="grouped-input">
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
