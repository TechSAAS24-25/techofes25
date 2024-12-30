import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Team from "./components/Team.jsx";
import Query from "./components/Query.jsx";
import Merchandise from "./components/Merchandise.jsx"
import Schedule from "./components/Schedule.jsx";
import StarAttractions from "./components/StarAttractions.jsx";
import "./App.css";
const Register = () => <h1>Register Page</h1>;
const Roadtrips = () => <h1>Roadtrips Page</h1>;
const AdventureTrips = () => <h1>Adventure Trips</h1>;
const CityTours = () => <h1>City Tours</h1>;
const Gallery = () => <h1>Gallery Page</h1>;
const HallOfFame = () => <h1>Hall Of Fame Page</h1>;
const Contact = () => <h1>Contact Page</h1>;
const Sponsors = () => <h1>Sponsors Page</h1>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/roadtrips" element={<Roadtrips />} />
        <Route path="/roadtrips/adventure" element={<AdventureTrips />} />
        <Route path="/roadtrips/city" element={<CityTours />} />
        <Route path="/merchandise" element={<Merchandise />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/star-attractions" element={<StarAttractions />} />
        <Route path="/hall-of-fame" element={<HallOfFame />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/team" element={<Team />} />
        <Route path="contact/query" element={<Query/>} />
        <Route path="/sponsors" element={<Sponsors />} />
      </Routes>
    </Router>
  );
}

export default App;
