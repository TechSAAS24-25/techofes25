import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ onLinkClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    "Events & Competitions",
    "Marketing",
    "Media & Publicity",
    "Show Management",
    "Finance",
    "Public Relations",
    "Security",
    "Design",
    "Web & IT",
  ];

  const handleClick = (role) => {
    onLinkClick(role);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`sidebar ${isMobile ? "collapsed" : ""}`}>
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={hoveredIndex === index ? "hovered" : ""}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleClick(item)}
          >
            <span className="highlight-bar"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
