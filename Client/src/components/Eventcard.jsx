import React from "react";
import "./Eventcard.css";

const EventCard = ({ icon, name }) => {
  return (
    <div className="event-card">
      <div className="event-icon">
        <img src={icon} className="ev_icon"></img>
      </div>
      <h2 className="event-name">{name}</h2>
    </div>
  );
};

export default EventCard;
