import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Registration.css";
import icecream from "../assets/food/icecream.gif";
import authServices from "../api/auth.js";
import storage from "../services/storage";

const foodItems = ["🍕", "🍔", "🍩", "🍣", "🌮", "🥞", "🍪", "🍿"];

const Login = () => {
  // const { setIsLoggedIn } = useParams();

  const [fallingFood, setFallingFood] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const newFood = {
        id: Date.now(),
        type: foodItems[Math.floor(Math.random() * foodItems.length)],
        left: Math.random() * 100, // Random horizontal position
      };
      setFallingFood((prev) => [...prev, newFood]);

      // Remove food after a certain time to clean up
      setTimeout(() => {
        setFallingFood((prev) => prev.filter((item) => item.id !== newFood.id));
      }, 5000); // Matches the animation duration
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      // Call the login function
      let userData = {
        username: formData.username,
        password: formData.password,
      };
      const response = await authServices.login(
        userData.username,
        userData.password
      );

      // Successful login
      // alert(`Welcome ${response.username}!`);

      storage.saveUser(response);

      // Log the user data retrieved from localStorage
      // const storedUser = storage.loadUser();
      // console.log("Stored User:", storedUser);

      // setIsLoggedIn(true);
      // Successful login
      alert(`Welcome ${response.username}!\nTID: ${response.T_ID} `);

      navigate("/events");
      window.location.reload();
    } catch (error) {
      // Handle errors returned by the API
      if (error.response) {
        console.error("Error:", error.response.data.error);
        alert(`Login failed: ${error.response.data.error}`);
      } else {
        console.error("Error:", error.message);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  return (
    <div className="registration-page">
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
          <img src={icecream}></img>
        </div>
        <div className="button-group">
          <button className="nav-btn active">Login</button>
          <button className="nav-btn" onClick={() => navigate("/registration")}>
            Register
          </button>
        </div>
      </div>
      <div className="right-form">
        <div className="form-card">
          <div className="header">
            <h1>Login</h1>
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
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
