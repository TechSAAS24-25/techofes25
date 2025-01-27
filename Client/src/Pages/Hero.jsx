import React, { useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Footer from "../components/Footer";
import "../Styles/Hero.css";
import food1 from "../assets/food/Non-Veg/chicken.png";
import cursor from "../assets/food/cursor.svg";
import CubeBackground from "../components/Cubebackground";
import AboutSection from "../components/About";
import ZoomParallax from "../components/ZoomParallax";
import EventScroll from "../components/EventScroll";
import PongalVideo from "../assets/pongal.mp4";
import Carousel from "../components/Carousel";
import logo from "../assets/logo.mp4";
import saas from "../assets/saas_logo.png";
import { mainCoordinators } from "../data/data.js";
import bgImage from "../assets/events/stage.jpeg";
import particles from "react-tsparticles";
import plateImage from "../assets/food/plate.jpg";

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

  const foodImages = [food1]; // The actual SVGs

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

const ParticleBackground = () => (
  <Particles
    params={{
      particles: {
        number: {
          value: 50,
        },
        size: {
          value: 3,
        },
        move: {
          direction: "none",
          random: true,
          speed: 1,
          outMode: "out",
        },
      },
    }}
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1, // ensures it stays behind other content
    }}
  />
);

// Countdown with rotating plates
const RotatingCountdown = ({ countdown }) => {
  return (
    <section className="countdown-container py-12 text-white">
      <div className="countdown-wrapper max-w-5xl mx-auto grid grid-cols-4 gap-6 text-center">
        {Object.entries(countdown).map(([label, value], index) => (
          <motion.div
            key={label}
            className="countdown-circle relative flex items-center justify-center"
            style={{
              width: "150px",
              height: "150px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Plate Image with Rotation Animation */}
            <motion.img
              src={plateImage}
              alt="Plate"
              className="absolute top-0 left-0 w-full h-full object-cover"
              animate={{
                rotate: [0, 360], // Rotate full 360 degrees
              }}
              transition={{
                repeat: Infinity, // Continuous rotation
                duration: 5 + index, // Vary the duration for each plate (so they rotate at different speeds)
                ease: "linear",
              }}
            />

            {/* Countdown value (static) */}
            <div
              className="countdown-value text-4xl font-bold text-white"
              style={{
                zIndex: 1, // Ensuring countdown number is on top of the plate
                position: "absolute",
                color: "black", // Make sure text is clearly visible on top of the background
                textShadow: "0px 0px 10px rgba(0, 0, 0, 0.6)", // Adding shadow to make text stand out
              }}
            >
              {value}
            </div>

            {/* Countdown label */}
            <h3
              className="countdown-label text-lg font-bold absolute top-1/4 w-full text-center"
              style={{
                zIndex: 1,
                textShadow: "0px 0px 10px rgba(0, 0, 0, 0.6)", // Adding shadow for readability
                color: "black", // Ensure text is visible and clear
              }}
            >
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Hero component
const Hero = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown Timer Effect
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

  // Smooth Scroll Setup with Lenis
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

  // Saas Logo Click Handler
  const handleSaasClick = () => {
    window.location.href = "https://saasceg.in";
  };

  return (
    <main
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AnimatedCursor />

      <div className="text-container">
        <div className="glass-techofes">
          <motion.div
            className="pop-effect"
            whileHover={{
              scale: 1.1,
              rotateX: 10,
              rotateY: 10,
              boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.6)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <video
              src={logo}
              alt="Techofes Logo"
              height={600}
              width={1050}
              className="neon-logo"
              autoPlay
              loop
              muted
            />
          </motion.div>

          <div
            className="saas-logo-container"
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              cursor: "pointer",
            }}
            onClick={handleSaasClick}
          >
            <motion.img
              src={saas}
              alt="Saas Logo"
              height={50}
              width={50}
              whileHover={{
                scale: 1.2,
                rotateY: 15,
                rotateX: -15,
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
              }}
              whileTap={{
                scale: 0.9,
                rotate: [0, -10, 10, 0], // add a small rotation on tap for extra effect
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />
          </div>
        </div>
      </div>

      {/* Countdown with rotating plates */}
      <RotatingCountdown countdown={countdown} />

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

      <div className="flex items-center h-screen z-10 bg-gradient-to-b to-yellow-500 from-orange-700 justify-start">
        <AboutSection />
      </div>

      <ZoomParallax />
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
};

export default Hero;
