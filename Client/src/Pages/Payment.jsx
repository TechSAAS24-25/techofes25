import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import backgroundImage from "../assets/food/p1.jpg"; // Background image
import backgroundVideo from "../assets/food/p2.mp4"; // Background video

const PaymentPage = () => {
  const [file, setFile] = useState(null);
  const [useVideo, setUseVideo] = useState(true); // Toggle between image or video background

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("paymentScreenshot", file);
    await axios.post("http://localhost:5000/upload", formData);
  };

  return (
    <motion.div
      className="p-6 text-center bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center relative"
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Section */}
      <div className="absolute inset-0 z-0">
        {useVideo ? (
          <video
            src={backgroundVideo}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover opacity-40"
          />
        ) : (
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-cover opacity-100"
          />
        )}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-4">
          Scan QR & Upload Payment Screenshot
        </h1>
        <motion.img
          src="/qr-code.png"
          alt="QR Code"
          className="mx-auto my-4 w-64"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="my-4 text-black px-2 py-1 border rounded"
        />
        <motion.button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-6 py-2 rounded mt-4 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Upload
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PaymentPage;
