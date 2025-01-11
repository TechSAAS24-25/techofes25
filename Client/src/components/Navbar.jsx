import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import homeIcon from "../assets/home.png";
import accom from "../assets/accommodation.webp";
import event from "../assets/events.png";
import more from "../assets/more.png";
import merch from "../assets/merch.png";
import contactIcon from "../assets/contact.png"; // Placeholder for contact icon
import scheduleIcon from "../assets/schedule.png"; // Placeholder for schedule icon

const Navbar = () => {
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
            to="/contact"
            className={({ isActive }) => (isActive ? "active-link" : "navLink")}
          >
            <div className="top-bar"></div>
            <img src={contactIcon} alt="Contact Icon" id="icon" />
            Contact
          </NavLink>
          <ul className="dropdown">
            <li>
              <NavLink
                to="/contact/team"
                className={({ isActive }) =>
                  isActive ? "dropdown-active-link" : "dropdown-link"
                }
              >
                Team
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact/query"
                className={({ isActive }) =>
                  isActive ? "dropdown-active-link" : "dropdown-link"
                }
              >
                Queries
              </NavLink>
            </li>
          </ul>
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
      </ul>
    </nav>
  );
};

export default Navbar;
