import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import "font-awesome/css/font-awesome.min.css";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(null);

  const handleMouseEnter = (menu) => {
    setDropdown(menu);
  };

  const handleMouseLeave = () => {
    setDropdown(null);
  };

  return (
    <nav className="navbar">
        <div className="navbar-whole">
            <div className="t-head">
            <img src="src/assets/saas_logo.png" className="logo" alt="Logo" />
            <h2 className="title">Techofes'25</h2>
            </div>
      <ul className="navbar-list">
        {[  
          { name: "Register", path: "/" },
          { name: "Roadtrips", path: "/roadtrips", submenu: [
            { name: "Adventure Trips", path: "/roadtrips/adventure" },
            { name: "City Tours", path: "/roadtrips/city" },
          ]},
          { name: "Merchandise", path: "/merchandise" },
          { name: "Schedule", path: "/schedule" },
          { name: "Gallery", path: "/gallery" },
          { name: "Star Attractions", path: "/star-attractions"},
          { name: "Hall Of Fame", path: "/hall-of-fame" },
          { name: "Contact", path: "/contact", submenu: [
            { name:"Core Team", path: "/contact/team" },
            { name:"Queries", path: "/contact/query" },
          ] },
          { name: "Sponsors", path: "/sponsors" },
        ].map((item, index) => (
          <li
            key={index}
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={handleMouseLeave}
          >
            <Link to={item.path} className="navbar-link">
              {item.name}
            </Link>
            {dropdown === item.name && item.submenu && (
              <ul className="dropdown">
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link to={subItem.path} className="dropdown-link">
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="social-icons">
        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-whatsapp"></i>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-facebook"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-instagram"></i>
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-youtube"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fa fa-linkedin"></i>
        </a>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
