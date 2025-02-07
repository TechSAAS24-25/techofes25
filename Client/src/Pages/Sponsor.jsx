import React from "react";
import { motion } from "framer-motion";
import "../Styles/Sponsor.css";
import agsLogo from "../assets/sponsor/ags1.png";
import mkLogo from "../assets/sponsor/mk.png";
import p3 from "../assets/food/p3.mp4";
import hiLogo from "../assets/sponsor/hindu.png";

const SponsorPage = () => {
  const sponsors = [
    { name: "AGS Cinemas", role: "Multiplex Partner", logo: agsLogo },
    { name: "Mittai kadai", role: "Refreshment Sponsor", logo: mkLogo },
    { name: "The Hindu", logo: hiLogo },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const glowAnimation = {
    whileHover: {
      boxShadow:
        "0 0 20px 5px rgba(255, 159, 67, 0.8), 0 0 30px 10px rgba(255, 200, 100, 0.6)",
      scale: 1.15,
      transition: { duration: 0.4 },
    },
    whileTap: {
      scale: 1.1,
      boxShadow:
        "0 0 15px 5px rgba(255, 159, 67, 0.6), 0 0 20px 5px rgba(255, 200, 100, 0.4)",
    },
  };

  return (
    <motion.div
      className="sponsor-page"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="video-background">
        <video
          src={p3}
          autoPlay
          loop
          muted
          className="background-video"
        ></video>
      </div>
      <h1 className="sponsor-title">Our Sponsors</h1>
      <div className="sponsor-container">
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={index}
            className="sponsor-card"
            variants={cardVariants}
            whileHover={glowAnimation.whileHover}
            whileTap={glowAnimation.whileTap}
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="sponsor-logo"
            />
            <h3 className="agstitle">{sponsor.name}</h3>
            <h3 className="agstitle">{sponsor.role}</h3>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SponsorPage;
