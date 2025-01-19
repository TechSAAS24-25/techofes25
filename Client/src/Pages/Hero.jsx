import React, { useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Footer from "../components/Footer";
import "../Styles/Hero.css";
import i1 from "../assets/food/i1.png";
import i2 from "../assets/food/samosa.gif";
import i3 from "../assets/food/i3.png";
import food1 from "../assets/food/Fast Food/food (1).svg";
// import food2 from "../assets/food/Fast Food/food (5).svg";
import food5 from "../assets/food/Fast Food/food.svg";
import food3 from "../assets/food/fruits/food (11).svg";
import food4 from "../assets/food/Non-Veg/food (4).svg";
import cursor from "../assets/food/cursor.svg";
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
import Carousel from "../components/Carousel";

import { mainCoordinators } from "../data/data.js";

function useEventListener(eventName, handler, element = document) {
  const savedHandler = React.useRef();

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

function AnimatedCursor({
  color = "220, 90, 90",
  outerAlpha = 0.4,
  innerSize = 8,
  outerSize = 8, // Path to the image you want to use for the outer cursor
}) {
  const cursorOuterRef = React.useRef();
  const cursorInnerRef = React.useRef();
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();
  const [isVisible, setIsVisible] = React.useState(true);
  const [isOverNavbar, setIsOverNavbar] = React.useState(false);
  const [currentFoodImage, setCurrentFoodImage] = React.useState(food1); // Use food1 as the initial image
  let endX = React.useRef(0);
  let endY = React.useRef(0);
  let outerCoords = React.useRef({ x: 0, y: 0 });

  const foodImages = [food1, food5, food3, food4]; // The actual SVGs

  const onMouseMove = React.useCallback(
    ({ clientX, clientY }) => {
      if (!isOverNavbar) {
        // Update cursor positions
        cursorInnerRef.current.style.top = `${clientY}px`;
        cursorInnerRef.current.style.left = `${clientX}px`;
      }
      endX.current = clientX;
      endY.current = clientY;
    },
    [isOverNavbar]
  );

  const animateOuterCursor = React.useCallback(
    (time) => {
      if (previousTimeRef.current !== undefined && !isOverNavbar) {
        outerCoords.current.x += (endX.current - outerCoords.current.x) / 8;
        outerCoords.current.y += (endY.current - outerCoords.current.y) / 8;

        cursorOuterRef.current.style.top = `${outerCoords.current.y}px`;
        cursorOuterRef.current.style.left = `${outerCoords.current.x}px`;
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateOuterCursor);
    },
    [isOverNavbar]
  );

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animateOuterCursor]);

  // Update the food image every 4 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFoodImage((prev) => {
        const currentIndex = foodImages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % foodImages.length;
        return foodImages[nextIndex];
      });
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const onMouseEnter = React.useCallback(() => setIsVisible(true), []);
  const onMouseLeave = React.useCallback(() => setIsVisible(false), []);

  useEventListener("mousemove", onMouseMove, document);
  useEventListener("mouseenter", onMouseEnter, document);
  useEventListener("mouseleave", onMouseLeave, document);

  React.useEffect(() => {
    if (isVisible && !isOverNavbar) {
      cursorInnerRef.current.style.opacity = 1;
      cursorOuterRef.current.style.opacity = 1;
    } else {
      cursorInnerRef.current.style.opacity = 0;
      cursorOuterRef.current.style.opacity = 0;
    }
  }, [isVisible, isOverNavbar]);

  React.useEffect(() => {
    const navbarElement = document.querySelector(".navbar");

    const handleMouseOverNavbar = () => setIsOverNavbar(true);
    const handleMouseOutNavbar = () => setIsOverNavbar(false);

    if (navbarElement) {
      navbarElement.addEventListener("mouseover", handleMouseOverNavbar);
      navbarElement.addEventListener("mouseout", handleMouseOutNavbar);
    }

    return () => {
      if (navbarElement) {
        navbarElement.removeEventListener("mouseover", handleMouseOverNavbar);
        navbarElement.removeEventListener("mouseout", handleMouseOutNavbar);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={cursorOuterRef}
        className="fixed pointer-events-none"
        style={{
          opacity: isVisible ? 1 : 0,
          zIndex: 999,
          transition: "opacity 150ms ease-in-out",
        }}
      >
        <img src={currentFoodImage} alt="food icon" height={70} width={70} />{" "}
        {/* Dynamically changing food image */}
      </div>
      {/* Inner Stylish Cursor */}
      <div
        ref={cursorInnerRef}
        className="fixed pointer-events-none"
        style={{
          background: "transparent",
          opacity: isVisible ? 1 : 0,
          zIndex: 999,
          transition: "opacity 150ms ease-in-out, transform 200ms ease-in-out",
        }}
      >
        <img src={cursor} alt="food icon" height={30} width={30} />
      </div>
    </>
  );
}
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
      <AnimatedCursor />
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

      {/* <div className="relative overflow-hidden bg-black py-6"> */}
      <ZoomParallax />
      {/* </div> */}
      <EventScroll />
      <div
        className="relative flex items-center justify-center h-screen overflow-hidden"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="relative z-10 py-20 bg-slate-800 text-white w-full h-full flex flex-col justify-between">
          <p className="font-michroma text-5xl">Meet Our Chefs</p>
          <Carousel cardsList={mainCoordinators || []} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
