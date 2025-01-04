import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import homeIcon from "../assets/home.png";
import accom from "../assets/accommodation.webp";
import event from "../assets/events.png";
import more from "../assets/more.png";
import merch from "../assets/merch.png";

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
            <img src={merch} alt="Home Icon" id="icon" />
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
            <img src={event} alt="Home Icon" id="icon" />
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
            <img src={accom} alt="Home Icon" id="icon" />
            Accommodation
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink
            to="/more"
            className={({ isActive }) => (isActive ? "active-link" : "navLink")}
          >
            <div className="top-bar"></div>
            <img src={more} alt="Home Icon" id="icon" />
            More
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
