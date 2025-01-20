import React, { useRef } from "react";
import Sidebar from "./Sidebar";
import "./Team.css";
import "font-awesome/css/font-awesome.min.css";
import teamImage1 from "../assets/IMG_20240605_171446.jpg";

import { mainCoordinators } from "../data/data.js";

const TeamMember = ({ img, name, position, instagramLink, linkedinLink }) => (
  <div className="team-member">
    <div className="image-container">
      <img src={img} alt={name} className="object-cover" />
    </div>
    <div className="member-details">
      <h3 className="pb-6">{name}</h3>
      <div className="team-media">
        <a href={instagramLink} target="_blank" rel="noopener noreferrer">
          <i className="fa fa-instagram"></i>
        </a>
        <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
          <i className="fa fa-linkedin"></i>
        </a>
      </div>
    </div>
  </div>
);

const Team = () => {
  const groupedMembers = mainCoordinators.reduce((acc, member) => {
    acc[member.position] = acc[member.position] || [];
    acc[member.position].push(member);
    return acc;
  }, {});

  // Create refs dynamically from groupedMembers' keys
  const roleRefs = Object.keys(groupedMembers).reduce((refs, position) => {
    refs[position] = useRef(null);
    return refs;
  }, {});

  // Scroll to the role section when a link is clicked
  const handleLinkClick = (position) => {
    if (roleRefs[position]?.current) {
      roleRefs[position].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="team-page">
      <Sidebar onLinkClick={handleLinkClick} />
      <div className="main-content">
        <h1>Core Team</h1>
        <div className="team-container">
          {Object.keys(groupedMembers).map((position) => (
            <div
              key={position}
              id={position}
              className="role-section"
              ref={roleRefs[position]}
            >
              <h2>{position}</h2>
              <div className="members">
                {groupedMembers[position].map((member, index) => (
                  <TeamMember
                    key={index}
                    img={member.imgSrc}
                    name={member.name}
                    position={member.position}
                    instagramLink={member.instagramLink}
                    linkedinLink={member.linkedinLink}
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
