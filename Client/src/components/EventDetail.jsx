import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../assets/p0fq9cyz.jpg";
import "./EventDetail.css";

// Dummy Data (Event details)
const dummyEventDetails = {
  Dance: {
    // icon: '/assets/dance.png',
    name: "Dance",
    about:
      "The inter-collegiate group dance competition is a platform for the best dancing troupes across the country to flaunt their hypnotic moves.",
    rules: [
      "The time limit for the overall performance is 5 minutes.",
      "Participants may use one or more songs in the performance.",
      "The maximum team size is 15 members.",
      "Use of props is allowed.",
    ],
    subTabs: {
      Solo: {
        description: "Solo performance details",
        icon: "/media/events/dance.jpeg",
      },
      Group: {
        description: "Group performance details",
        icon: "/media/events/dance.jpeg",
      },
      Battle: {
        description: "Battle performance details",
        icon: "/media/events/dance.jpeg",
      },
    },
  },
  Music: {
    // icon: '/assets/music.png',
    name: "Music",
    about:
      "Showcase your musical talent in this exciting inter-collegiate music competition.",
    rules: [
      "Performance time limit is 7 minutes.",
      "Use of pre-recorded tracks is allowed.",
      "Solo or group participation is allowed.",
    ],
    subTabs: {
      Solo: {
        description: "Solo music performance details",
        icon: "/media/events/dance.jpeg",
      },
      Group: {
        description: "Group music performance details",
        icon: "/media/events/dance.jpeg",
      },
      Band: {
        description: "Band music performance details",
        icon: "/media/events/dance.jpeg",
      },
    },
  },
  Dramatics: {
    // icon: '/assets/drama.png',
    name: "Dramatics",
    about:
      "Showcase your dramatic talent in this exciting inter-collegiate dramatics competition.",
    rules: [
      "Performance time limit is 7 minutes.",
      "Use of props is allowed.",
      "Solo or group participation is allowed.",
    ],
    subTabs: {
      Solo: {
        description: "Solo dramatic performance details",
        icon: "/media/events/dance.jpeg",
      },
      Group: {
        description: "Group dramatic performance details",
        icon: "/media/events/dance.jpeg",
      },
      Theater: {
        description: "Theater dramatic performance details",
        icon: "/media/events/dance.jpeg",
      },
    },
  },
};

const EventDetail = () => {
  const { eventName } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedSubTab, setSelectedSubTab] = useState("Solo");

  useEffect(() => {
    const fetchedEvent = dummyEventDetails[eventName];
    if (fetchedEvent) {
      setEvent(fetchedEvent);
    }
  }, [eventName]);

  if (!event) {
    return <h2>Loading...</h2>;
  }

  // Get the icon and description for the selected sub-tab
  const selectedSubTabDetails = event.subTabs[selectedSubTab];

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <h2 className=" text-white text-4xl e-heading">{event.name}</h2>
      <div className="sub-tabs">
        {Object.keys(event.subTabs).map((subTab) => (
          <button
            key={subTab}
            onClick={() => setSelectedSubTab(subTab)}
            className={selectedSubTab === subTab ? "active-sub-tab" : ""}
          >
            <div
              className={`e-top ${
                selectedSubTab === subTab ? "active-line" : ""
              }`}
            ></div>

            <p className="e-desc">{subTab}</p>

            <div
              className={`e-bottom ${
                selectedSubTab === subTab ? "active-line" : ""
              }`}
            ></div>
          </button>
        ))}
      </div>

      <div className="event-detail-container">
        <div className="event-head">
          <img
            src={selectedSubTabDetails?.icon || event.icon}
            alt="Event icon"
            className="e-icon"
          />
          <div className="event-title-wrapper">
            <h1 className="event-title text-white">{event.name}</h1>
            <button className="register-btn">Register</button>
          </div>
        </div>

        <div className="text-left	text-white">
          <h2 className="font-bold text-xl text-black">About</h2>
          <p className="event-about">{event.about}</p>

          <h2 className="font-bold  text-xl text-black">Rules</h2>
          <ul className="event-rules pl-5">
            {event.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>

          {/* Sub Tabs */}
          <h3 className="font-bold sub-heading text-black text-xl">
            {selectedSubTab}
          </h3>
          <p className="sub-desc">{selectedSubTabDetails?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
