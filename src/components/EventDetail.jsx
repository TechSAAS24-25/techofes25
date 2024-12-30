import React from "react";
import { useParams } from "react-router-dom";
import "./EventDetail.css";

const eventDetails = {
  Dance: {
    icon: "./assets/dance.png",
    name: "Dance",
    about:
      "The inter-collegiate group dance competition is a platform for the best dancing troupes across the country to flaunt their hypnotic moves. Step onto our stage where synchronized moves and collective energy create a mesmerizing spectacle.",
    rules: [
      "The time limit for the overall performance is 5 minutes; exceeding by 1 minute will lead to disqualification.",
      "Participants may use one or more songs in the performance within 5 minutes.",
      "The maximum team size is 15 members.",
      "Participants should get their songs/music on a pen drive. Live music is not allowed.",
      "Use of props is allowed.",
      "Teams are STRICTLY prohibited from mentioning college names during the performance by any medium. Any team doing so will be awarded a penalty.",
      "All dance forms, including hip-hop, Punjabi, Jazz, Kathakali, Contemporary, etc., are allowed.",
      "Judging criteria includes: (A) Synchronisation and coordination (40 points), (B) Choreography and creativity (30 points), (C) Artistic Presentation (30 points).",
      "Winners get a chance to grab a direct spot in Centrifuge during the main fest.",
    ],
  },
  Music: {
    icon: "src/assets/music.png",
    name: "Music",
    about: "Showcase your musical talent in this exciting inter-collegiate music competition.",
    rules: [
      "Performance time limit is 7 minutes.",
      "Use of pre-recorded tracks is allowed.",
      "Solo or group participation is allowed.",
    ],
  },
};

const EventDetail = () => {
  const { eventName } = useParams();
  const event = eventDetails[eventName];

  if (!event) {
    return <h2>Event not found</h2>;
  }

  return (
    <div className="event-detail-container">
        <div className="event-head">
        <img src={event.icon} className="e-icon" />
        <div className="event-title-wrapper">
        <h1 className="event-title">{event.name}</h1>
        <button className="register-btn">Register</button>
        </div>
        </div>
        <h2>About</h2>
      <p className="event-about">{event.about}</p>
      <h2>Rules</h2>
      <ul className="event-rules">
        {event.rules.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetail;
