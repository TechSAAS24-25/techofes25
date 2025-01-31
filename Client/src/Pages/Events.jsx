import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import EventCard from "../components/Eventcard.jsx";
import "../Styles/Events.css";
import backgroundImage from "../assets/p0fq9cyz.jpg";
import eventServices from "../api/events.js";
import Footer from "../components/Footer.jsx";

const Events = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [categories, setCategories] = useState([
    "General Events",
    "Signature Events",
    "Pro-shows",
    "Carnivals",
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
          alert(`Event fetching failed: ${error.response.data.error}`);
        } else {
          console.error("Error:", error.message);
          alert("An unexpected error occurred. Please try again later.");
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
              <EventCard
                key={index}
                icon={"../src/assets/dance.png"}
                name={category}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};
export default Events;
