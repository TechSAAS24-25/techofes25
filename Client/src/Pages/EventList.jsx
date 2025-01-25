import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EventCard from "../components/Eventcard.jsx";
import "../Styles/Events.css";
import backgroundImage from "../assets/p0fq9cyz.jpg";
import eventServices from "../api/events.js";
import image from "../assets/dance.png";

const EventList = () => {
  const { category, type } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventServices.getEvents();
        const filteredEvents = response.filter(
          (event) => event.category === category && event.type === type
        );
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to load events.");
      }
    };
    fetchEvents();
  }, [category, type]);

  return (
    <div
      className="events-container"
      style={{
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <h1 className="events-title">{type}</h1>
      <div className="events-grid">
        {events.map((event, index) => (
          <Link
            key={index}
            to={`/event/${event._id}`}
            className="type-link"
          >
            <EventCard key={event._id} icon={image} name={event.eventName} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventList;
