import React, { useState } from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen min-w-full overflow-hidden">
      <div className="text-center relative w-[100%] h-screen content-center">
        <div
          className="hover:opacity-80 mx-10 hover:mx-0 text-center relative h-[60%] w-[50%] p-8 cursor-pointer overflow-hidden rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-orange-400 hover:via-pink-400 hover:to-cyan-500 bg-gray-500 
        text-white hover:text-black content-center hover:h-[100%] hover:w-[100%]
        transition-all duration-950 ease-in-out hover:pr-[50%]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h1 className="text-xl lg:text-5x mb-6 transition-all duration-500 ease-in-out transform hover:scale-110">
            ABOUT TECHOFES
          </h1>
          <p className="text-sm lg:text-lg px-4 transition-all duration-500 ease-in-out">
            Techofes is the annual cultural festival of College of Engineering
            Guindy, Anna University, Chennai held in mid February, and is one of
            the most popular cultural festivals in South India. Techofes is held
            for 4 nights and 3 days which draws a footfall of about 40,000
            students from more than 250 colleges across South India. period of
            about eight months in preparation of the 4 day festival. With an
            approximate strength of 600, this team works on conceptualization to
            successful execution every year, with no assistance from any event
            management company or professionals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
