import React from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/Eventcard.jsx";
import "../Styles/Events.css";

const Events = () => {
  const events = [
    { icon: "src/assets/dance.png", name: "Dance" },
    { icon: "src/assets/dance.png", name: "Music" },
    { icon: "src/assets/dance.png", name: "Dramatics" },
    { icon: "src/assets/dance.png", name: "Dramatics" },
    { icon: "src/assets/dance.png", name: "Dramatics" },
  ];

  return (
    <div className="events-container">
      <h1 className="events-title">Events</h1>
      <div className="events-grid">
        {events.map((event, index) => (
          <Link to={`/event/${event.name}`} key={index} className="event-link">
            <EventCard key={index} icon={event.icon} name={event.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Events;
