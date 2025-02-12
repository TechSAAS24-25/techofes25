import React from "react";
import "../Styles/Merch.css";
import backgroundImage from "../assets/events/stage1.jpeg";
import tshirtImage from "../assets/merch.png";

const Merchandise = () => {
  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="glass-container">
        {/* Image Section */}
        <div className="image-merch">
          <div className="image-frame">
            <img src={tshirtImage} alt="Techofes'25 T-shirt" />
          </div>
          <a
            href="https://forms.gle/4D2iDxLyZyMdPwSd6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="order-button">Order Now</button>
          </a>
        </div>

        {/* Details Section */}
        <div className="details-container">
          <p>
            <strong>Techofes'78 T-shirt Orders</strong> <br />
            <strong>Buy one T-shirt:</strong> ₹149 <br />
            <strong>For bulk of five T-shirts:</strong> ₹699 <br />
            <strong>Available Sizes:</strong> S, M, L, XL, XXL
          </p>

          <h2 className="tagline">
            Own the Vibe, Wear the Legacy!! WEAR IT. FLAUNT IT. TECHOFES IT!
          </h2>
          <p>
            <strong>Register via:</strong> <br />
            <a
              href="https://forms.gle/4D2iDxLyZyMdPwSd6"
              target="_blank"
              rel="noopener noreferrer"
              className="buy-now-link"
            >
              Buy Now
            </a>
          </p>

          <p className="deadline">
            <b>Last Date for Registration:</b>{" "}
            <span className="date-highlight">Feb 18th,2025</span>
          </p>
          <p>
            <strong>For any queries, contact:</strong> <br />
            <strong>Parthiban R:</strong>{" "}
            <a href="tel:9894966090">9894966090</a> <br />
            <strong>Arul Manisha A:</strong>{" "}
            <a href="tel:8778500130">8778500130</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Merchandise;
