import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EventCard from "../components/Eventcard.jsx";
import "../Styles/Events.css";
import backgroundImage from "../assets/p0fq9cyz.jpg";
import eventServices from "../api/events.js";
import showToast from "../components/toastNotifications";
import defaultImage from "../assets/dance.png"; // Fallback image

const EventList = () => {
  const { category, type } = useParams();
  const [events, setEvents] = useState([]);
  const [eventImages, setEventImages] = useState({});

  useEffect(() => {
    // Import both .png and .jpg images dynamically (fixing PNG issue)
    const imageModules = import.meta.glob("../assets/event/*.{png,jpg,jpeg}", {
      eager: true,
    });

    // Normalize image filenames (convert to lowercase, remove extensions)
    const imagesMap = Object.keys(imageModules).reduce((acc, path) => {
      const filename = path
        .split("/")
        .pop()
        .toLowerCase()
        .replace(/\.(png|jpg|jpeg)$/, ""); // Remove extensions
      acc[filename] = imageModules[path].default; // Store image path
      return acc;
    }, {});

    setEventImages(imagesMap);
    console.log("Event Images:", imagesMap); // Debugging: Check if PNG and JPG are loaded

    // Fetch events from API
    const fetchEvents = async () => {
      try {
        const response = await eventServices.getEvents();
        const filteredEvents = response.filter(
          (event) => event.category === category && event.type === type
        );
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        showToast("error", "Failed to load events.");
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
        {events.map((event, index) => {
          const eventNameKey = event.eventName.toLowerCase(); // Convert event name to lowercase
          const eventImage = eventImages[eventNameKey] || defaultImage; // Use matched image or fallback

          return (
            <Link
              key={event._id}
              to={`/event/${event._id}`}
              className="type-link"
            >
              <EventCard
                key={event._id}
                icon={eventImage}
                name={event.eventName}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default EventList;
