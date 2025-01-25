import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import EventCard from "../components/Eventcard.jsx";
import "../Styles/Events.css";
import backgroundImage from "../assets/p0fq9cyz.jpg";
import eventServices from "../api/events.js";
import image from "../assets/dance.png";

const EventTypes = () => {
  const { category } = useParams();
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await eventServices.getEvents();
        const filteredTypes = [
          ...new Set(
            response
              .filter((event) => event.category === category)
              .map((event) => event.type)
          ),
        ];
        setTypes(filteredTypes);
      } catch (error) {
        console.error("Error fetching event types:", error);
        alert("Failed to load event types.");
      }
    };
    fetchTypes();
  }, [category]);

  return (
    <div
      className="events-container"
      style={{
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <h1 className="events-title">{category}</h1>
      <div className="events-grid">
        {types.map((type, index) => (
          <Link
            key={index}
            to={`/events/${category}/${type}`}
            className="type-link"
          >
            <EventCard key={index} icon={image} name={type} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventTypes;
