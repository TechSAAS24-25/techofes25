import React from "react";
import { FaDownload, FaPhoneAlt } from "react-icons/fa";

function TabContent({ activeTab, petData }) {
  return (
    <div className="tab-content">
      <p>{petData[activeTab].fact}</p>

      {/* Download button for RULES tab */}
      {petData[activeTab].animal === "RULES" &&
        petData[activeTab].downloadLink && (
          <div className="download-section">
            <a
              href={petData[activeTab].downloadLink}
              download="rule.pdf"
              className="download-button"
            >
              <FaDownload /> Download Rules
            </a>
          </div>
        )}
    </div>
  );
}

export default TabContent;
