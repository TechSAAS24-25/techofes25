import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import Merch from "./Pages/Merch.jsx";
import Events from "./Pages/Events.jsx";
import EventDetail from "./components/EventDetail.jsx";
import Accommodation from "./Pages/Accommodation.jsx";
import More from "./Pages/More.jsx";
import Hero from "./Pages/Hero.jsx";
import "./App.css";

import Team from "./components/Team.jsx";
import Query from "./components/Query.jsx";
import Merchandise from "./components/Merchandise.jsx";
import Schedule from "./components/Schedule.jsx";
import StarAttractions from "./components/StarAttractions.jsx";
import SponsorPage from "./Pages/Sponsor.jsx";
import "./App.css";
const Register = () => <h1>Register Page</h1>;
const Gallery = () => <h1>Gallery Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/" element={<Hero />} />
        {/* <Route path="/" element={<Hero />} /> */}
        <Route path="/merch" element={<Merch />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:eventName" element={<EventDetail />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/sponsor" element={<SponsorPage />} />

        <Route path="/more" element={<More />} />

        <Route path="/merchandise" element={<Merchandise />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/star-attractions" element={<StarAttractions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/team" element={<Team />} />
        <Route path="contact/query" element={<Query />} />
      </Routes>
    </Router>
  );
}

export default App;
