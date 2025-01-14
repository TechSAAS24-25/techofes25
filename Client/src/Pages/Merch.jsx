import React from "react";
import "../Styles/Merch.css"; // Import global CSS

const Merchandise = () => {
  return (
    <div className="container">
      {" "}
      {/* Updated to global class name */}
      <div className="box">
        {" "}
        {/* Updated to global class name */}
        <div className="foodIcon"></div> {/* Food animation/icon */}
        <div className="body">
          <Text3d primary={"Coming"} secondary={"Soon"} />
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
