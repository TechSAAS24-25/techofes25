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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        {/* <Route path="/" element={<Hero />} /> */}
        <Route path="/merch" element={<Merch />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:eventName" element={<EventDetail />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/more" element={<More />} />
      </Routes>
    </Router>
  );
}

export default App;
