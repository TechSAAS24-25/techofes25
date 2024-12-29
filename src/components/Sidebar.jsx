import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ onLinkClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  return (
    <div className="sidebar">
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
