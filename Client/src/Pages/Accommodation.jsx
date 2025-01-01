import React from "react";
import "../Styles/Accommodation.css";
import Textbox from "../components/Textbox.jsx";

function Accommodation() {
  const contents = [
    {
      content:
        "Techofes is an annual intercollegiate culture festival at the College of Engineering, Guindy in Chennai, India. The tradition began in 1948. It is a three-day event usually held in mid-February.",
    },
    { content: "Techofes 06 took place starting 10 February 2006" },
    { content: "Techofes'25 is coming soon..............." },
  ];

  return (
    <div className="accom-container">
      <h1 className="accom-title">Accommodation Info</h1>
      <div className="accom-grid">
        {contents.map((c, index) => (
          <Textbox key={index} content={c.content} />
        ))}
      </div>
    </div>
  );
}

export default Accommodation;
