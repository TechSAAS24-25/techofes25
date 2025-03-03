import React, { useState } from "react";
import "../Styles/Accommodation.css";
import TabContent from "../components/TabContent";
import TabButtons from "../components/TabButtons";
import { FaBed } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaQuestion } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";

function Accommodation() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDays, setSelectedDays] = useState([]); // Track selected days
  const [includeFood, setIncludeFood] = useState(false); // Track food option

  const basePrice = 400; // Price without food per day
  const foodPrice = 450; // Price with food per day

  // Handle checkbox selection
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedDays((prev) =>
      checked ? [...prev, value] : prev.filter((day) => day !== value)
    );
  };

  // Calculate total price
  const totalPrice =
    selectedDays.length * (includeFood ? foodPrice : basePrice);

  const petData = [
    {
      animal: "INFO",
      fact: "Participants need to check in at the reception with a valid ID.",
      image: "/assets/3.svg",
      icon: <FaInfoCircle />,
    },
    {
      animal: "REACHING ANNA UNIVERSITY",
      fact: "You can reach via metro, bus, or taxi from the airport or railway station.",
      image: "/assets/1.svg",
      icon: <FaLocationDot />,
    },
    {
      animal: "FAQ",
      fact: "For any queries, you can contact the event organizers.",
      image: "/assets/7.svg",
      icon: <FaQuestion />,
      details: [
        { name: "Kathir S", number: "9894939097" },
        { name: "Shreyaa Vinod", number: "9438190895" },
      ],
    },
    {
      animal: "RULES",
      fact: "Participants need to follow the rules and regulations of the event.",
      image: "/assets/5.svg",
      icon: <IoNewspaper />,
      downloadLink: "/rule.pdf",
    },
  ];

  return (
    <div className="main__container">
      <h1 className="acctitle">ACCOMMODATION</h1>

      <div className="maincontacc">
        <div className="mainaccinside">
          <div className="accomodationcharge">
            <h3 className="charges">Accommodation Charge</h3>

            <h5 className="without">With food - Rs. 400 per day</h5>

            <div className="gender">
              <h2>Select Gender</h2>

              <div className="radios">
                <label>
                  <input type="radio" name="accommodation" value="male" /> Male
                </label>
                <label>
                  <input type="radio" name="accommodation" value="female" />{" "}
                  Female
                </label>
                <label>
                  <input type="radio" name="accommodation" value="others" />{" "}
                  Others
                </label>
              </div>

              <h3 className="selectacc">Select Your Accommodation Dates</h3>
              <div className="charge">
                <label>
                  <input
                    type="checkbox"
                    value="day1"
                    onChange={handleCheckboxChange}
                  />
                  March 5
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="day2"
                    onChange={handleCheckboxChange}
                  />
                  March 6
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="day3"
                    onChange={handleCheckboxChange}
                  />
                  March 7
                </label>
              </div>

              <h3 className="total-amount">Total Amount: Rs. {totalPrice}</h3>
              <p className="offline-payment">
                <strong>Note:</strong> The amount must be paid on the day of
                check-in in offline mode.
              </p>
            </div>
          </div>

          <TabButtons
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            petData={petData}
          />
          <TabContent activeTab={activeTab} petData={petData} />
        </div>
      </div>
    </div>
  );
}

export default Accommodation;
