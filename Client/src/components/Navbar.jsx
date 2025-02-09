import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import storage from "../services/storage";
import "./Navbar.css";
import homeIcon from "../assets/home.png";
import accom from "../assets/accommodation.webp";
import event from "../assets/events1.png";
import more from "../assets/more.png";
import saas from "../assets/SAASgold.png";
import merch from "../assets/merch.png";
import contactIcon from "../assets/contact.png";
import scheduleIcon from "../assets/schedule1.png";
import sponsor from "../assets/sponsor.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import authServices from "../api/auth.js";

import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Detect location changes

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const user = storage.loadUser();
    setIsLoggedIn(!!user);

    // Close the menu whenever the route changes
    setIsMenuOpen(false);
  }, [location]); // Runs when the route changes

  const handleLogout = () => {
    storage.removeUser();

    const logout = async () => {
      try {
        const response = await authServices.logout();
        setIsLoggedIn(false);
        toast.success("Logout Successful");
      } catch (error) {
        console.error("Error logging out:", error);
        toast.error("Logout Error!");
      }
    };
    logout();
    navigate("/login");
  };

  // Saas Logo Click Handler
  const handleSaasClick = () => {
    window.location.href = "https://saasceg.in";
  };

  return (
    <nav className="navbar z-10">
      <div
        className="saas-logo-container"
        style={{
          position: "fixed",
          left: "20px",
          cursor: "pointer",
          zIndex: 40,
        }}
        onClick={handleSaasClick}
      >
        <motion.img
          src={saas}
          alt="Saas Logo"
          height={50}
          width={50}
          whileHover={{
            scale: 1.2,
            rotateY: 15,
            rotateX: -15,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
          }}
          whileTap={{
            scale: 0.9,
            rotate: [0, -10, 10, 0], // Small rotation effect on tap
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`navList ${isMenuOpen ? "show" : ""}`}>
        <li className="navItem">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "navLink")}
          >
            <div className="top-bar"></div>
            <img src={homeIcon} alt="Home Icon" id="icon" />
            Home
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink
            to="/merch"
            className={({ isActive }) => (isActive ? "active-link" : "navLink")}
          >
            <div className="top-bar"></div>
            <img src={merch} alt="Merch Icon" id="icon" />
            Merch
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink
            to="/events"
            className={({ isActive }) => (isActive ? "active-link" : "navLink")}
          >
            <div className="top-bar"></div>
            <img src={event} alt="Events Icon" id="icon" />
            Events
          </NavLink>
        </li>
        {/* <li className="navItem">
          <NavLink
            to="/registration"
            className={({ isActive }) => (isActive ? "active-link" : "navLink")}
          >
            <div className="top-bar"></div>
            <img src={register} alt="Register Icon" id="icon" />
            Register
          </NavLink>
        </li> */}

        <li className="navItem">
          <NavLink
            to="/accommodation"
            className={({ isActive }) => (isActive ? "active-link" : "navLink")}
          >
            <div className="top-bar"></div>
            <img src={accom} alt="Accommodation Icon" id="icon" />
            Accommodation
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink
            to="/contact/team"
            className={({ isActive }) => (isActive ? "active-link" : "navLink")}
          >
            <div className="top-bar"></div>
            <img src={contactIcon} alt="Contact Icon" id="icon" />
            Contact
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink
            to="/schedule"
            className={({ isActive }) => (isActive ? "active-link" : "navLink")}
          >
            <div className="top-bar"></div>
            <img src={scheduleIcon} alt="Schedule Icon" id="icon" />
            Schedule
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink
            to="/sponsor"
            className={({ isActive }) => (isActive ? "active-link" : "navLink")}
          >
            <div className="top-bar"></div>
            <img src={sponsor} alt="Sponsor Icon" id="icon" />
            Sponsor
          </NavLink>
        </li>

        {isLoggedIn ? (
          <li className="navItem">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "active-link" : "navLink"
              }
            >
              <div className="top-bar"></div>
              <img src={more} alt="More Icon" id="icon" />
              User Profile
            </NavLink>
          </li>
        ) : null}

        <li className="navItem">
          {isLoggedIn ? (
            <button className="logout-button" onClick={handleLogout}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="icon-white"
                style={{ color: "#fff" }}
              />{" "}
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "active-link" : "navLink"
              }
            >
              <button className="login-button">
                <FontAwesomeIcon
                  icon={faSignInAlt}
                  className="icon-white"
                  style={{ color: "#fff" }}
                />{" "}
                Login
              </button>
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
