import React, { useState, useEffect } from "react";
import "./Sidebar.css";

const Sidebar = ({ onLinkClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    "President",
    "Vice President",
    "General Secretary",
    "Joint Secretary",
    "Sports Secretary",
    "Corporate Relation",
    "Finance",
    "Events,Workshops & Carnivals",
    "Logistics",
    "HR & Hospitality",
    "Marketing",
    "Contents",
    "Technical Design",
    "Graphical Design",
    "Permissions & Documentation",
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
    <div
      style={{ scrollbarWidth: "none" }}
      className={`sidebar overflow-scroll pb-20 pt-4 backdrop-blur-sm bg-white/10 ${
        isMobile ? "collapsed" : ""
      }`}
    >
      <ul>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={
              hoveredIndex === index
                ? "text-black font-bold hovered"
                : "text-black font-bold"
            }
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
