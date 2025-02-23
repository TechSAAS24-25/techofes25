import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import EventCard from "../components/Eventcard.jsx";
import "../Styles/Events.css";
import backgroundImage from "../assets/events/stage1.jpeg";
import eventServices from "../api/events.js";
import showToast from "../components/toastNotifications";
import image from "../assets/dance.png";

const Events = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [categories, setCategories] = useState([
    "General Events",
    "Signature Events",
    "Pro-shows",
    "Carnivals",
    "Sports"
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await eventServices.getEvents();
        setEventDetails(response);
      } catch (error) {
        if (error.response) {
          console.error("Error:", error.response.data.error);
          showToast(
            "error",
            `Event fetching failed: ${error.response.data.error}`
          );
        } else {
          console.error("Error:", error.message);
          showToast(
            "error",
            "An unexpected error occurred. Please try again later."
          );
        }
      }
    };
    fetchUserDetails();
  }, [navigate]);

  return (
    <div
      className="events-container"
      style={{
        minHeight: "100vh", // Use minHeight instead of height
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div style={{ flex: 1 }}>
        {/* Main Content */}
        <h1 className="events-title">Categories</h1>
        <div className="events-grid">
          {categories?.map((category, index) => (
            <Link to={`/events/${category}`} key={index} className="event-link">
              <EventCard key={index} icon={image} name={category} />
            </Link>
          ))}
        </div>
        {/* <h1 className="align-middle events-title">
          <div className="events-container text-center">
            <h1 className="text-2xl font-bold">Event Registration</h1>
            <Link
              to="/payment"
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 inline-block"
            >
              Register Now
            </Link>
          </div>
        </h1> */}
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};
export default Events;
