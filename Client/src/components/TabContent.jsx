import React from "react";
import { FaDownload } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
function TabContent({ activeTab, petData }) {
  return (
    <div className="tab-content">
      {/* <h2>{petData[activeTab].animal}</h2> */}
      <p>{petData[activeTab].fact}</p>

      {/* Display additional details for FAQ tab */}
      {petData[activeTab].animal === "FAQ" && petData[activeTab].details && (
        <div className="faq-details">
          <h3>Contact Details:</h3>
          <h4 className="drop">
            Drop mail at {}
            <a href="mailto:support@example.com" className="email-link">
              support@example.com
            </a>
          </h4>
          <ul>
            {petData[activeTab].details.map((detail, index) => (
              <li key={index}>
                <FaPhoneAlt />
                {detail.name} - {detail.number}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Download button for RULES tab */}
      {petData[activeTab].animal === "RULES" &&
        petData[activeTab].downloadLink && (
          <div className="download-section">
            <a
              href={petData[activeTab].downloadLink}
              download
              className="download-button"
            >
              <FaDownload />
              Download Rules
            </a>
          </div>
        )}
    </div>
  );
}

export default TabContent;
