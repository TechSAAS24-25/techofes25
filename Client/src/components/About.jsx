import React, { useState } from "react";
import { motion } from "framer-motion";
import foodImage from "../assets/food/food.jpg"; // Replace with the actual path of the food-related image

const AboutSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen min-w-full overflow-hidden bg-gradient-to-br from-orange-200 via-yellow-300 to-red-200">
      <div className="text-center relative flex flex-col lg:flex-row items-center w-[100%] h-screen content-center gap-10">
        {/* Text Section */}
        <motion.div
          className="text-center relative h-[60%] lg:w-[50%] p-8 cursor-pointer overflow-hidden rounded-xl shadow-2xl bg-gradient-to-tr from-yellow-100 via-orange-200 to-red-200 hover:bg-gradient-to-tr hover:from-orange-300 hover:via-yellow-300 hover:to-red-300 
          text-gray-800 hover:text-gray-900 content-center transition-all duration-700 ease-in-out hover:h-[70%] hover:w-[55%]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{
            scale: 1.05,
            rotate: [0, 3, -3, 3, 0],
          }}
          animate={{
            opacity: [1, 0.95, 1],
          }}
        >
          <motion.h1
            className="text-xl lg:text-5xl mb-6 font-extrabold transition-all duration-500 ease-in-out transform hover:scale-110"
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.15,
              textShadow: "0px 0px 10px rgba(255,255,255,0.8)",
            }}
          >
            ABOUT TECHOFES
          </motion.h1>
          <motion.p
            className="text-sm lg:text-lg px-4 transition-all duration-500 ease-in-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
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
        </motion.div>

        {/* Food-Themed Image */}
        <motion.div
          className="relative lg:w-[40%] h-[50%] flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.1,
            rotate: [0, 5, -5, 5, 0],
            transition: { duration: 0.5 },
          }}
        >
          <img
            src={foodImage}
            alt="Food Theme"
            className="rounded-2xl shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
