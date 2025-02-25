import React, { useState, useEffect, useRef } from "react";
import "./Schedule.css";
import eventservices from "../api/events/";

const allowedDates = ["March 5", "March 6", "March 7", "March 8"]; 

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
};

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const timelineRef = useRef([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await eventservices.getEvents();
        console.log("Fetched Events:", events); // Debugging step
    
        // Ensure API dates are formatted correctly
        const formattedEvents = events.map((event) => ({
          ...event,
          date: formatDate(event.date), // Convert to "March 6"
        }));
    
        // Group events by date
        const groupedEvents = formattedEvents.reduce((acc, event) => {
          if (!acc[event.date]) {
            acc[event.date] = { date: event.date, events: [] };
          }
          acc[event.date].events.push(event);
          return acc;
        }, {});
    
        const uniqueDays = Object.values(groupedEvents).filter((day) =>
          allowedDates.includes(day.date)
        );
    
        console.log("Filtered Events:", uniqueDays);
        setScheduleData(uniqueDays);
    
        if (uniqueDays.length > 0) {
          setSelectedDay(uniqueDays[0].date);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();    
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    timelineRef.current.forEach((el) => el && observer.unobserve(el));
    timelineRef.current = [];

    const currentEvents =
      scheduleData.find((day) => formatDate(day.date) === selectedDay)?.events || [];
    
    currentEvents.forEach((_, index) => {
      const el = document.getElementById(`event-${index}`);
      if (el) {
        timelineRef.current[index] = el;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [selectedDay, scheduleData]);

  const currentEvents =
    scheduleData.find((day) => formatDate(day.date) === selectedDay)?.events || [];

  return (
    <div className="schedule" style={{ height: "100vh" }}>
      <h1 className="schedule-title">Schedule</h1>

      <div className="tabs">
        {scheduleData.map((day, index) => (
          <button
            key={index}
            className={formatDate(day.date) === selectedDay ? "active" : ""}
            onClick={() => setSelectedDay(formatDate(day.date))}
          >
            {formatDate(day.date)}
          </button>
        ))}
      </div>

      <div className="timeline">
        {currentEvents.length > 0 ? (
          currentEvents.map((event, index) => (
            <div key={index} className="timeline-item hidden" id={`event-${index}`}>
              <div className="event-card">
                <h2>{event.eventName}</h2>
                <p>{event.location}</p>
                <button>Open in Map</button>
                <p>{event.time}</p>
              </div>
              <img src={event.image} alt={event.title} className="schedule-img" />
            </div>
          ))
        ) : (
          <p>No events scheduled for this day.</p>
        )}
      </div>
    </div>
  );
};

export default Schedule;
