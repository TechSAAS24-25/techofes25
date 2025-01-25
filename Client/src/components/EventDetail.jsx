import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../assets/p0fq9cyz.jpg";
import eventServices from "../api/events.js";
import "./EventDetail.css";
import eventImages from "../data/eventImages"; // Import the eventImages dictionary

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedSubTab, setSelectedSubTab] = useState("Solo");

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await eventServices.getEvent(id);
        console.log(response);
        setEvent(response);
      } catch (error) {
        console.error("Error fetching event details:", error);
        alert("Failed to load event details.");
      }
    };
    fetchEventDetails();
  }, [id]);

  if (!event) {
    return <h2>Loading...</h2>;
  }

  // Get the icon and description for the selected sub-tab
  const selectedSubTabDetails = event.subTabs?.[selectedSubTab];

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <h2 className="text-white text-4xl e-heading">{event.category}</h2>
      {/* <div className="sub-tabs">
        {event.subTabs &&
          Object.keys(event.subTabs).map((subTab) => (
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
      </div> */}

      <div className="event-detail-container">
        <div className="event-head">
          <img
            src={eventImages[event.eventName]}
            alt="Event icon"
            className="e-icon"
          />
          <div className="event-title-wrapper">
            <h1 className="event-title text-white">{event.eventName}</h1>
            <button className="register-btn">Register</button>
          </div>
        </div>

        <div className="text-center text-white">
          <h2 className="font-bold text-xl text-gray-300">About</h2>
          <p className="event-about">{event.description}</p>
          {/* 
          <h2 className="font-bold text-xl text-black">Rules</h2>
          <ul className="event-rules pl-5">
            {event.rules?.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul> */}

          {/* Sub Tabs */}
          {selectedSubTabDetails && (
            <>
              <h3 className="font-bold sub-heading text-black text-xl">
                {selectedSubTab}
              </h3>
              <p className="sub-desc">{selectedSubTabDetails.description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
