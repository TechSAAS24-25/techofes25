import React, { useState, useEffect, useRef } from "react";
import "./Schedule.css";

const scheduleData = [
  {
    day: "Day 1",
    events: [
      {
        title: "Event 1",
        location: "Hall A",
        time: "09:00 AM",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Event 2",
        location: "Hall B",
        time: "10:30 AM",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Event 3",
        location: "Hall A",
        time: "11:00 AM",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Event 4",
        location: "Hall B",
        time: "12:30 PM",
        image: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    day: "Day 2",
    events: [
      {
        title: "ESTAMPIE PRELIMS",
        location: "Audi",
        time: "08:00 AM",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "PAIR ON STAGE PRELIMS",
        location: "L19",
        time: "09:00 AM",
        image: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    day: "Day 3",
    events: [
      {
        title: "Event 3",
        location: "Hall C",
        time: "11:00 AM",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Event 4",
        location: "Outdoor",
        time: "02:00 PM",
        image: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    day: "Day 4",
    events: [
      {
        title: "Closing Ceremony",
        location: "Main Stage",
        time: "05:00 PM",
        image: "https://via.placeholder.com/150",
      },
    ],
  },
];

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const timelineRef = useRef([]);

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

    // Clear previous refs to avoid conflicts
    timelineRef.current.forEach((el) => el && observer.unobserve(el));
    timelineRef.current = []; // Reset the refs array

    const currentEvents =
      scheduleData.find((day) => day.day === selectedDay)?.events || [];
    currentEvents.forEach((_, index) => {
      const el = document.getElementById(`event-${index}`);
      if (el) {
        timelineRef.current[index] = el;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [selectedDay]);

  const currentEvents =
    scheduleData.find((day) => day.day === selectedDay)?.events || [];

  return (
    <div className="schedule" style={{ height: "100vh" }}>
      <h1 className="schedule-title">Schedule</h1>
      <h1 className="schedule-title">Coming Soon</h1>

      {/* <div className="tabs">
        {scheduleData.map((day, index) => (
          <button
            key={index}
            className={day.day === selectedDay ? "active" : ""}
            onClick={() => setSelectedDay(day.day)}
          >
            {day.day}
          </button>
        ))}
      </div>
      <div className="timeline">
        {currentEvents.map((event, index) => (
          <div
            key={index}
            className="timeline-item hidden"
            id={`event-${index}`}
          >
            <div className="event-card">
              <h2>{event.title}</h2>
              <p>{event.location}</p>
              <button>Open in Map</button>
              <p>{event.time}</p>
            </div>
            <img src={event.image} alt={event.title} className="schedule-img" />
          </div>
        ))}
        {currentEvents.length === 0 && <p>No events scheduled for this day.</p>}
      </div> */}
    </div>
  );
};

export default Schedule;
