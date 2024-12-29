import React, { useRef } from "react";
import Sidebar from "./Sidebar";
import "./Team.css";
import "font-awesome/css/font-awesome.min.css";
import teamImage1 from "../assets/IMG_20240605_171446.jpg";

const TeamMember = ({ image, name, contact, whatsapp, facebook, linkedin}) => (
  <div className="team-member">
    <div className="image-container">
      <img src={image} alt={name} />
    </div>
    <div className="member-details">
      <h3>{name}</h3>
      <div className="team-media">
        <a href={`mailto:${contact}`} target="_blank" rel="noopener noreferrer">
          <i className="fa fa-envelope"></i>
        </a>
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
          <i className="fa fa-whatsapp"></i>
        </a>
        <a href={facebook} target="_blank" rel="noopener noreferrer">
          <i className="fa fa-facebook"></i>
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <i className="fa fa-linkedin"></i>
        </a>
      </div>
    </div>
  </div>
);

const Team = () => {
  const teamMembers = [
    {
      image: teamImage1,
      name: "Aryavardhan Rathour",
      role: "Marketing",
      contact: "arya@example.com",
      whatsapp: "1234567890",
      facebook: "https://facebook.com/aryavardhan",
      linkedin: "https://linkedin.com/in/aryavardhan",
    },
    {
      image: teamImage1,
      name: "John Doe",
      role: "Events & Competitions",
      contact: "john@example.com",
      whatsapp: "2345678901",
      facebook: "https://facebook.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    },
    {
      image: teamImage1,
      name: "John Doe",
      role: "Events & Competitions",
      contact: "john@example.com",
      whatsapp: "2345678901",
      facebook: "https://facebook.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    },
    {
      image: teamImage1,
      name: "Jane Smith",
      role: "Design",
      contact: "jane@example.com",
      whatsapp: "3456789012",
      facebook: "https://facebook.com/janesmith",
      linkedin: "https://linkedin.com/in/janesmith",
    },
    {
      image: teamImage1,
      name: "Emily Johnson",
      role: "Web & IT",
      contact: "emily@example.com",
      whatsapp: "4567890123",
      facebook: "https://facebook.com/emilyjohnson",
      linkedin: "https://linkedin.com/in/emilyjohnson",
    },
    {
      image: teamImage1,
      name: "Emily Johnson",
      role: "Show Management",
      contact: "emily@example.com",
      whatsapp: "4567890123",
      facebook: "https://facebook.com/emilyjohnson",
      linkedin: "https://linkedin.com/in/emilyjohnson",
    },
    {
      image: teamImage1,
      name: "Emily Johnson",
      role: "Media & Publicity",
      contact: "emily@example.com",
      whatsapp: "4567890123",
      facebook: "https://facebook.com/emilyjohnson",
      linkedin: "https://linkedin.com/in/emilyjohnson",
    },
  ];
  const groupedMembers = teamMembers.reduce((acc, member) => {
    acc[member.role] = acc[member.role] || [];
    acc[member.role].push(member);
    return acc;
  }, {});
  const roleRefs = {
    "Events & Competitions": useRef(null),
    "Marketing": useRef(null),
    "Media & Publicity": useRef(null),
    "Show Management": useRef(null),
    "Finance": useRef(null),
    "Public Relations": useRef(null),
    "Security": useRef(null),
    "Design": useRef(null),
    "Web & IT": useRef(null),
  };
  const handleLinkClick = (role) => {
    if (roleRefs[role] && roleRefs[role].current) {
      roleRefs[role].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="team-page">
      <Sidebar onLinkClick={handleLinkClick} />
      <div className="main-content">
        <h1>Core Team</h1>
        <div className="team-container">
          {Object.keys(groupedMembers).map((role) => (
            <div
              key={role}
              id={role}
              className="role-section"
              ref={roleRefs[role]} 
            >
              <h2>{role}</h2>
              <div className="members">
                {groupedMembers[role].map((member, index) => (
                  <TeamMember
                    key={index}
                    image={member.image}
                    name={member.name}
                    contact={member.contact}
                    whatsapp={member.whatsapp}
                    facebook={member.facebook}
                    linkedin={member.linkedin}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
