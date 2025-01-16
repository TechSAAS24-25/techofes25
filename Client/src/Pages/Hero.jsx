import React, { useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Lenis from "lenis";
import Footer from "../components/Footer";
import "../Styles/Hero.css";
import i1 from "../assets/food/i1.png";
import i2 from "../assets/food/samosa.gif";
import i3 from "../assets/food/i3.png";
import FoodBackground1 from "../assets/food/general/food (3).svg";
import FoodBackground2 from "../assets/food/general/food (6).svg";
import CubeBackground from "../components/Cubebackground";
import Dish1 from "../assets/food/Desserts/food (9).svg";
import Dish2 from "../assets/food/Fast Food/food (5).svg";
import Dish3 from "../assets/food/Fast Food/food (8).svg";
import AboutSection from "../components/About";
import ZoomParallax from "../components/ZoomParallax";
import EventScroll from "../components/EventScroll";
import PongalVideo from "../assets/pongal.mp4";

export default function Hero() {
  const { scrollYProgress: slideScrollYProgress } = useScroll();
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Smooth scrolling setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  // Countdown Timer
  useEffect(() => {
    const eventDate = new Date("2025-03-05T00:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animation Variants
  const neonTextVariants = {
    animate: {
      textShadow: [
        "0 0 5px #ffaf40, 0 0 10px #ffaf40, 0 0 20px #ff7e00, 0 0 30px #ff6b00",
        "0 0 10px #fff200, 0 0 20px #ffde00, 0 0 30px #ffcb00",
        "0 0 5px #ffaf40, 0 0 10px #ffaf40, 0 0 20px #ff7e00, 0 0 30px #ff6b00",
      ],
      transition: {
        repeat: Infinity,
        duration: 4,
        ease: "linear",
      },
    },
  };

  return (
    <main>
      {/* Neon Text Animation */}
      <div className="text-container">
        <div className="glass-techofes">
          <motion.h1
            className="neon-text"
            variants={neonTextVariants}
            animate="animate"
          >
            TECHOFES'78
          </motion.h1>
          {/* Food-themed Animated Background */}
          <motion.img
            src={i3}
            alt="Food"
            className="food-animation"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1.2, 1],
              opacity: [0, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.img
            src={i2}
            alt="Samosa GIF"
            className="food-animation-secondary"
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: [0, 20, -10],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="countdown-container">
        <div className="countdown-box">
          <h3 className="countdown-label">Days</h3>
          <p className="countdown-value">{countdown.days}</p>
        </div>
        <div className="countdown-box">
          <h3 className="countdown-label">Hours</h3>
          <p className="countdown-value">{countdown.hours}</p>
        </div>
        <div className="countdown-box">
          <h3 className="countdown-label">Minutes</h3>
          <p className="countdown-value">{countdown.minutes}</p>
        </div>
        <div className="countdown-box">
          <h3 className="countdown-label">Seconds</h3>
          <p className="countdown-value">{countdown.seconds}</p>
        </div>
      </div>

      {/* Food-Themed Background */}
      <div className="video-background-container">
        <video
          className="video-background"
          autoPlay
          loop
          muted
          playsInline
          src={PongalVideo}
        />
        <div className="video-overlay">
          <h2 className="symphony-text">Symphony of Taste</h2>
        </div>
      </div>
      <div className="z-0 fixed transform lg:translate-x-1/2 lg:-translate-y-52 w-full h-full">
        <CubeBackground />
      </div>
      {/* Symphony of Taste Section */}
      <div className="flex items-center h-screen z-10 bg-gradient-to-b to-yellow-500 from-orange-700 justify-start">
        <AboutSection />
      </div>

      <div className="relative overflow-hidden bg-black py-6">
        <ZoomParallax />
      </div>
      <EventScroll />
      <div
        className="relative flex items-center justify-center h-screen overflow-hidden"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="relative z-10 p-20 bg-yellow-900 text-white w-full h-full flex flex-col justify-between">
          <p className="font-michroma text-5xl">Meet Our Chefs</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
