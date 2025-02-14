import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/p0fq9cyz.jpg";
import eventServices from "../api/events.js";
import storage from "../services/storage";
import "./EventDetail.css";
import eventImages from "../data/eventImages";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formatDescription = (description) => {
  return description.split("\n").map((line, index) => {
    const parts = line.split(":");
    if (parts.length > 1) {
      return (
        <React.Fragment key={index}>
          <br />
          <br />
          <p className=" text-gray-300 underline">
            <strong>
              {parts[0]}:<br></br>
            </strong>{" "}
          </p>
          <p>{parts.slice(1).join(":")}</p>
        </React.Fragment>
      );
    }
    return line.trim() ? <p key={index}>{line}</p> : <br key={index} />;
  });
};

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const [selectedSubTab, setSelectedSubTab] = useState("Solo");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [user, setUser] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const user = storage.loadUser();
    setIsLoggedIn(!!user);
    setUser(user);

    const fetchEventDetails = async () => {
      try {
        const response = await eventServices.getEvent(id);
        setEvent(response);
      } catch (error) {
        console.error("Error fetching event details:", error);
        toast.error("Failed to load event details.");
      }
      if (user) {
        try {
          const response = await eventServices.registerStatus(id);
          console.log(response);
          setIsRegistered(response.isRegistered);
          setIsPaid(response.status === "pending");
        } catch (error) {
          console.error("Error fetching registration status:", error);
          toast.error("Failed to load registration status.");
        }
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleRegister = async () => {
    if (!isLoggedIn) {
      toast.warning("Please log in to register for events.");
      return;
    }

    if (user.T_ID.endsWith("CEG") && event.category === "General Events") {
      try {
        const response = await eventServices.registerForGeneralEvents(
          user.T_ID
        );
        console.log(response);
        toast.success(
          response.message || "Successfully registered for general events!"
        );
        window.location.reload();
      } catch (error) {
        toast.error("Failed to register for general events.");
      }
    } else {
      navigate(`/payment/${id}`);
    }
  };

  if (!event) {
    return <h2>Loading...</h2>;
  }

  // Get the icon and description for the selected sub-tab
  const selectedSubTabDetails = event.subTabs?.[selectedSubTab];

  return (
    <div
      className="min-h-[150vh] sm:min-h-[300vh]"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <h2 className="text-white text-4xl e-heading">{event.category}</h2>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div
        className="event-detail-container flex flex-col items-start lg:px-16 lg:py-16 p-6"
        style={{ alignItems: "flex-start" }}
      >
        <div className="event-head">
          <div className="event-title-wrapper">
            <h1 className="event-title text-white">{event.eventName}</h1>
            {isRegistered ? (
              <button className="bg-blue-950 text-white register-btn-disabled disabled">
                Registered
              </button>
            ) : isPaid ? (
              <button className="bg-orange-700 text-white register-btn-disabled disabled">
                Pending Approval
              </button>
            ) : isLoggedIn ? (
              <button
                className="register-btn bg-violet-800"
                onClick={handleRegister}
              >
                {event.category != "General Events"
                  ? "Register"
                  : "Register for all General Events"}
              </button>
            ) : (
              <button
                className="bg-slate-400 text-black register-btn-disabled disabled"
                disabled
              >
                Please login to register for events
              </button>
            )}
            <h1 className="text-xl text-white">
              Registration Fees:{" "}
              {user?.T_ID?.endsWith("CEG") &&
              event.category === "General Events"
                ? "₹0"
                : `₹ ${event.regFees}`}{" "}
              <h6 className="text-base">
                {event.category !== "General Events"
                  ? ""
                  : "(For all General Events)"}
              </h6>
            </h1>

            {/* <button
              className=" bg-slate-400 text-black register-btn-disabled disabled"
              disabled
            >
              Coming soon
            </button> */}
          </div>
          <img
            src={eventImages[event.eventName]}
            alt="Event icon"
            className="e-icon hidden invisible sm:block"
          />
        </div>

        <div className="text-left text-white">
          <h2 className="font-bold text-xl text-gray-300 underline">About</h2>
          <p
            className="text-left event-about"
            style={{ whiteSpace: "pre-line" }}
          >
            {formatDescription(event.description)}
          </p>

          {/* Sub Tabs */}
          {selectedSubTabDetails && (
            <>
              <h3 className="font-bold sub-heading text-black text-xl">
                {selectedSubTab}
              </h3>
              <p className="sub-desc">{selectedSubTabDetails.description}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
