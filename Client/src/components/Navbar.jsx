import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import storage from "../services/storage";
import "./Navbar.css";
import homeIcon from "../assets/home.png";
import accom from "../assets/accommodation.webp";
import event from "../assets/events1.png";
import more from "../assets/more.png";
import merch from "../assets/merch.png";
import contactIcon from "../assets/contact.png"; // Placeholder for contact icon
import scheduleIcon from "../assets/schedule1.png"; // Placeholder for schedule icon
import sponsor from "../assets/sponsor.png";
import register from "../assets/register.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import authServices from "../api/auth.js";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = storage.loadUser();
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    storage.removeUser(); // Clear user data from storage

    const logout = async () => {
      try {
        const response = await authServices.logout();
        setIsLoggedIn(false);
        alert("logout successful.");
      } catch (error) {
        console.error("Error logging out:", error);
        alert("Failed to logout.");
      }
    };
    logout();
  };

  return (
    <nav className="navbar z-10">
      <ul className="navList">
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
            className={({ isActive, isPending }) =>
              window.location.pathname.startsWith("/event") || isActive
                ? "active-link"
                : "navLink"
            }
          >
            <div className="top-bar"></div>
            <img src={event} alt="Events Icon" id="icon" />
            Events
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink
            to="/registration"
            className={({ isActive, isPending }) =>
              window.location.pathname.startsWith("/registration") || isActive
                ? "active-link"
                : "navLink"
            }
          >
            <div className="top-bar"></div>
            <img src={register} alt="Register Icon" id="icon" />
            Register
          </NavLink>
        </li>
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
            to="/more"
            className={({ isActive }) => (isActive ? "active-link" : "navLink")}
          >
            <div className="top-bar"></div>
            <img src={more} alt="More Icon" id="icon" />
            More
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
