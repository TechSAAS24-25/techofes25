import React, { useState, useEffect, useRef } from "react";
import "./Schedule.css";
import eventservices from "../api/events/";

const allowedDates =["March 1", "March 2", "March 5", "March 6", "March 7", "March 8"]; 

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

        // Add specific events to the specified dates
        const additionalEvents = [
          { eventName: "INAUGURATION", date: "March 5" },
          { eventName: "INFORMALS & TALENT OF TECHOFES", date: "March 6" },
          { eventName: "INFORMALS & TALENT OF TECHOFES", date: "March 7" },
          { eventName: "INFORMALS & TALENT OF TECHOFES", date: "March 8" },
          { eventName: "PHOTOTHON – A PHOTOGRAPHY HACKATHON", date: "March 7" },
          { eventName: "PHOTOTHON – A PHOTOGRAPHY HACKATHON", date: "March 8" },
          { eventName: "FOOTBALL", date: "March 1" },
          { eventName: "KABADDI", date: "March 1" },
          { eventName: "BALL BADMINTON - WOMEN", date: "March 1" },
          { eventName: "BALL BADMINTON - MEN", date: "March 1" },
          { eventName: "CRICKET", date: "March 1" },
          { eventName: "HOCKEY", date: "March 1" },
          { eventName: "BASKET BALL", date: "March 1" },
          { eventName: "HAND BALL", date: "March 1" },
          { eventName: "FOOTBALL", date: "March 2" },
          { eventName: "KABADDI", date: "March 2" },
          { eventName: "BALL BADMINTON - WOMEN", date: "March 2" },
          { eventName: "BALL BADMINTON - MEN", date: "March 2" },
          { eventName: "CRICKET", date: "March 2" },
          { eventName: "HOCKEY", date: "March 2" },
          { eventName: "BASKET BALL", date: "March 2" },
          { eventName: "HAND BALL", date: "March 2" },
        ];
        

        const allEvents = [...additionalEvents, ...formattedEvents];
    
        // Group events by date
        const groupedEvents = allEvents.reduce((acc, event) => {
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
      <p className="schedule-instructions">
        RB - Red Building
        <br />
        DH - Drawing Hall  
        <br />
        LH - Lecture Hall
        <br />
        FN - Forenoon
        <br />
        AN - Afternoon
     </p>
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
                <button
                    onClick={() => {
                     const location = event.location;
                     const regex = /^(RB \d+|DH \d+)(,\s*(RB \d+|DH \d+))*$/i;
                     const query = regex.test(location) ? "College of Engineering Guindy" : location;

                     window.open(
                     `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
                      "_blank"
                     );
                     }}
                    >
                  Open in Map
                </button>
                <p>{event.time}</p>
              </div>
              <img src={event.image} alt={event.title} className="schedule-img" />
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
