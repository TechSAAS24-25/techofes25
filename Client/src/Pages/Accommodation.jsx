import React from "react";
import "../Styles/Accommodation.css";
import Textbox from "../components/Textbox.jsx";
import bgImage from "../assets/events/stage1.jpeg";

function Accommodation() {
  const contents = [
    {
      content: "COMING SOON",
    },
  ];

  return (
    <div
      className="accom-container h-full"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <h1 className="accom-title">Accommodation</h1>
      <div className="accom-grid">
        {contents.map((c, index) => (
          <Textbox key={index} content={c.content} />
        ))}
      </div>
    </div>
  );
}

export default Accommodation;
