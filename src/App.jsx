import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home.jsx";
import Merch from "./Merch.jsx";
import Events from "./Events.jsx";
import EventDetail from "./components/EventDetail.jsx";
import Accommodation from "./Accommodation.jsx";
import More from "./More.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
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
