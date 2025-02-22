import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import eventServices from "../api/events.js";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/food/p2.mp4"; // Background video
import showToast from "../components/toastNotifications";
import gpay100 from "../assets/gpay/100.jpeg";
import gpay250 from "../assets/gpay/250.jpeg";
import gpay200 from "../assets/gpay/200.jpeg";
import gpay300 from "../assets/gpay/300.jpeg";
import gpay1000 from "../assets/gpay/1000.jpeg";
import gpay2000 from "../assets/gpay/2000.jpeg";

const gpayImages = {
  200: gpay200,
  100: gpay100,
  1000: gpay1000,
  250: gpay250,
  300: gpay300,
  2000: gpay2000,
};

const PaymentPage = () => {
  const [file, setFile] = useState(null);
  const [transactionId, setTransactionId] = useState(""); // State for transaction ID
  const [isUploading, setIsUploading] = useState(false); // Upload button state
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [regFees, setRegFees] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventData = await eventServices.getEvent(eventId);
        setRegFees(eventData?.regFees);
        // console.log(eventData);
      } catch (error) {
        showToast("error", "Failed to load event details.");
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleUpload = async () => {
    if (!transactionId.trim() || !file) return;

    setIsUploading(true); // Disable button while uploading

    try {
      const response = await eventServices.payForEvent(
        eventId,
        transactionId,
        file
      );

      if (
        response?.message ===
        "Successfully registered for the event, waiting for admin approval..."
      ) {
        showToast("success", response?.message);
      } else {
        console.log(response);
        showToast(
          "error",
          response?.response?.data?.error || "Payment processing failed."
        );
      }
    } catch (error) {
      consol.log(error);
      showToast(
        "error",
        error?.error || error?.message || "Payment processing failed."
      );
      // showToast("error", "Error processing payment.");
    } finally {
      setIsUploading(false); // Re-enable button after response
    }
  };

  const isFormValid = transactionId.trim() !== "" && file !== null;
  const qrImagePath = regFees ? gpayImages[regFees] : null;
  console.log(qrImagePath);
  return (
    <motion.div
      className="p-6 text-center bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center relative"
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 z-0">
        <video
          src={backgroundVideo}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-4">
          Scan QR & Upload Payment Screenshot
        </h1>
        <motion.img
          src={qrImagePath}
          alt="QR Code"
          className="mx-auto my-4 w-64"
          // animate={{ rotate: [0, 5, -5, 0] }}
          // transition={{ repeat: Infinity, duration: 2 }}
        />
        <input
          type="text"
          placeholder="Enter Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="my-4 text-black px-2 py-1 border rounded w-64"
          required
        />
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              if (!["image/png", "image/jpeg"].includes(file.type)) {
                showToast("error", "Only PNG and JPG files are allowed.");
                e.target.value = ""; // Reset the input
                return;
              }
              if (file.size > 1 * 1024 * 1024) {
                showToast("error", "File size must be 1MB or less.");
                e.target.value = ""; // Reset the input
                return;
              }
              handleFileChange(e);
            }
          }}
          className="my-4 text-black px-2 py-1 border rounded w-64"
        />
        <motion.button
          onClick={handleUpload}
          disabled={!isFormValid || isUploading}
          className={`px-6 py-2 rounded mt-4 shadow-lg transition-all ${
            isUploading
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : isFormValid
              ? "bg-blue-500 text-white hover:scale-110"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
          whileTap={isFormValid && !isUploading ? { scale: 0.9 } : {}}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PaymentPage;
