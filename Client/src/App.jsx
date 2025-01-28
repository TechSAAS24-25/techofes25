import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Merch from "./Pages/Merch.jsx";
import Events from "./Pages/Events.jsx";
import EventDetail from "./components/EventDetail.jsx";
import Accommodation from "./Pages/Accommodation.jsx";
import More from "./Pages/More.jsx";
import Hero from "./Pages/Hero.jsx";
import EventTypes from "./Pages/EventTypes.jsx";
import EventList from "./Pages/EventList.jsx";
import Team from "./components/Team.jsx";
import Merchandise from "./components/Merchandise.jsx";
import Schedule from "./components/Schedule.jsx";
import StarAttractions from "./components/StarAttractions.jsx";
import SponsorPage from "./Pages/Sponsor.jsx";
import Registration from "./Pages/Registration.jsx";
import Login from "./Pages/Login.jsx";
import Admin from "./Pages/Admin.jsx";
import preloader from "./assets/preload.mp4";
import "./App.css";

const Register = () => <h1>Register Page</h1>;
const Gallery = () => <h1>Gallery Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

function App() {
  // Define the loading state within the functional component
  const [loading, setLoading] = useState(true);

  // Use useEffect to simulate loading duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate loading for 3 seconds
    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return (
    <Router>
      {/* Show preloader while loading */}
      {loading ? (
        <div className="preloader">
          <video autoPlay muted loop className="preloader-video">
            <source src={preloader} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/accommodation" element={<Accommodation />} />
            <Route path="/sponsor" element={<SponsorPage />} />
            <Route path="/more" element={<More />} />
            <Route path="/merchandise" element={<Merchandise />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/star-attractions" element={<StarAttractions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/team" element={<Team />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/events/:category" element={<EventTypes />} />
            <Route path="/events/:category/:type" element={<EventList />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
