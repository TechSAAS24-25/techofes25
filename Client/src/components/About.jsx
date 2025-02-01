import React from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/t77.jpg"; // Replace with the actual path of the background image

const AboutSection = () => {
  return (
    <div
      className="relative flex justify-center items-center min-h-screen w-full bg-auto bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative flex flex-col items-center justify-center w-full h-screen px-6 text-center">
        {/* Text Section */}
        <motion.h1
          className="text-3xl lg:text-6xl font-extrabold text-white mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          whileHover={{
            scale: 1.2,
            textShadow: "0px 0px 30px rgba(255, 255, 255, 1)",
            rotate: [0, 2, -2, 0],
          }}
        >
          ABOUT TECHOFES
        </motion.h1>

        <motion.p
          className="text-lg lg:text-xl text-gray-200 leading-relaxed max-w-4xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          whileHover={{
            scale: 1.1,
            color: "#ffdd57",
            textShadow: "0px 0px 15px rgba(255, 221, 87, 1)",
          }}
        >
          Techofes is the annual cultural festival of College of Engineering
          Guindy, Anna University, Chennai held in mid-February, and is one of
          the most popular cultural festivals in South India. Techofes is held
          for 4 nights and 3 days, drawing a footfall of about 40,000 students
          from over 250 colleges across South India. The festival preparation
          spans around eight months, with a team of 600 members working on
          conceptualization to successful execution every year, with no
          assistance from event management companies or professionals.
        </motion.p>

        <motion.div
          className="mt-10 text-white font-semibold border-b-2 border-gray-400 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          whileHover={{
            scale: 1.15,
            color: "#ffa500",
            borderColor: "#ffa500",
            textShadow: "0px 0px 15px rgba(255, 165, 0, 1)",
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-5 text-red-300 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          whileHover={{
            color: "#B82132",
            textShadow: "0px 0px 10px rgba(224, 109, 109, 0.8)",
          }}
        >
          Celebrating culture and creativity since 1948.
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
