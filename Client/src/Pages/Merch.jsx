import React from "react";
import "../Styles/Merch.css"; // Import global CSS
import backgroundImage from "../assets/events/stage1.jpeg";

const Merchandise = () => {
  return (
    <div
      // className="container"
      style={{
        height: "100vh", // Use minHeight instead of height
        width: "100%", // Use minHeight instead of height
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        // flexDirection: "column",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      {" "}
      {/* Updated to global class name */}
      <div className="box">
        {" "}
        {/* Updated to global class name */}
        <div className="foodIcon"></div> {/* Food animation/icon */}
        <div className="body">
          <Text3d primary={"Coming soon"} />
        </div>
      </div>
    </div>
  );
};

function Text3d({ primary, secondary }) {
  return (
    <div className="textContainer">
      {" "}
      {/* Updated to global class name */}
      <p className="primary">{primary}</p>
      <p className="secondary">{secondary}</p>
    </div>
  );
}

export default Merchandise;
