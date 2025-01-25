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
    "Proshows",
    "Carnivals",
  ]);
  const navigate = useNavigate();
  const events = [
    { icon: "src/assets/dance.png", name: "Dance" },
    { icon: "src/assets/dance.png", name: "Music" },
    { icon: "src/assets/dance.png", name: "Dramatics" },
    { icon: "src/assets/dance.png", name: "Dramatics" },
    { icon: "src/assets/dance.png", name: "Dramatics" },
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await eventServices.getEvents();

        console.log("events:", response);
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
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
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
      {/* <Footer /> */}
    </div>
  );
};

export default Events;
