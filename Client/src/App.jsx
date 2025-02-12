import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { Analytics } from "@vercel/analytics/react";
import Merch from "./Pages/Merch.jsx";
import Events from "./Pages/Events.jsx";
import EventDetail from "./components/EventDetail.jsx";
import Accommodation from "./Pages/Accommodation.jsx";
import Hero from "./Pages/Hero.jsx";
import EventTypes from "./Pages/EventTypes.jsx";
import EventList from "./Pages/EventList.jsx";
import Team from "./components/Team.jsx";
import Schedule from "./components/Schedule.jsx";
import StarAttractions from "./components/StarAttractions.jsx";
import SponsorPage from "./Pages/Sponsor.jsx";
import Registration from "./Pages/Registration.jsx";
import Login from "./Pages/Login.jsx";
import Admin from "./Pages/Admin.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import PaymentPage from "./Pages/Payment.jsx";
import preloader from "./assets/preload.mp4";
import "./App.css";

const Register = () => <h1>Register Page</h1>;
const Gallery = () => <h1>Gallery Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black z-50">
          <video autoPlay muted loop className="w-full h-full object-contain">
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
            <Route path="/payment/:eventId" element={<PaymentPage />} />
            {/* <Route path='/more' element={<More />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/star-attractions" element={<StarAttractions />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/team" element={<Team />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            {/* <Route path='/dashboard' element={<Dashboard />} /> */}
            <Route path="/events/:category" element={<EventTypes />} />
            <Route path="/events/:category/:type" element={<EventList />} />
          </Routes>
          <Toaster position="bottom-right" />
        </>
      )}
    </Router>
  );
}

export default App;
