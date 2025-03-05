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
import logo1 from "../assets/logo.png";
import saas from "../assets/SAASgold.png";
import { mainCoordinators } from "../data/data.js";
import Particles from "@tsparticles/react";
import plateImage from "../assets/food/plate.png";
import heroVideo from "../assets/hero-bg.mp4";
import Celebs from "./Celebs.jsx";

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

function AnimatedCursor({}) {
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
        className="fixed pointer-events-none hidden md:block"
        style={{
          opacity: isVisible ? 1 : 0,
          zIndex: 999,
          transition: "opacity 150ms ease-in-out",
        }}
      ></div>
      {/* Inner Stylish Cursor */}
      <div
        ref={cursorInnerRef}
        className="fixed pointer-events-none hidden md:block"
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
    <section className="countdown-container lg:py-2  py-12 text-amber-300">
      <div className="countdown-wrapper lg:gap-4 gap-1 max-w-5xl mx-auto flex flex-wrap justify-center items-center text-center">
        {Object.entries(countdown).map(([label, value], index, array) => (
          <div key={label} className="flex items-center">
            {/* Countdown Item */}
            <motion.div className="countdown-circle relative flex items-center justify-center lg:w-60 lg:h-60 w-16 h-16 overflow-hidden">
              {/* Rotating Plate Image */}
              <motion.img
                src={plateImage}
                alt="Plate"
                className="absolute top-0 left-0 w-full h-full object-cover mt-4 lg:visible invisible"
                style={{
                  // filter: "blur(px)",
                  opacity: 0.7,
                }}
                animate={{ rotate: [0, 360] }}
                transition={{
                  repeat: Infinity,
                  duration: 5 + index,
                  ease: "linear",
                }}
              />

              {/* Countdown Value */}
              <div
                className="countdown-value lg:text-6xl text-2xl lg:pb-0 pb-4 font-bold text-yellow-500"
                style={{
                  zIndex: 1,
                  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
                }}
              >
                {value}
              </div>

              {/* Countdown Label */}
              <h3
                className="countdown-label text-lg font-bold absolute bottom-2 w-full text-center text-yellow-500  lg:pb-8"
                style={{
                  zIndex: 1,
                  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
                }}
              >
                {label.charAt(0).toUpperCase() + label.slice(1)}
              </h3>
            </motion.div>

            {/* Add Colon Except for Last Item */}
            {index < array.length - 1 && (
              <span className="text-4xl font-bold text-yellow-500 mx-2 lg:mx-4">
                :
              </span>
            )}
          </div>
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

  return (
    <main className="overflow-x-clip">
      <AnimatedCursor />

      <div className="text-container relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={heroVideo}
          autoPlay
          loop
          muted
        />

        <img className=" z-10" src={logo1}></img>
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
          preload="auto"
          onError={(e) => console.error("Video failed to load", e)}
        >
          <source src={PongalVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="video-overlay text-center flex flex-col">
          <h2 className="symphony-text  lg:text-8xl text-4xl  font-semibold">
            Symphony of Tastes
          </h2>
          <br />
          <h3 className="symphony-text font-black text-2xl  pt-4 ">
            MARCH 5 - 8
          </h3>
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

      <div>
        <Celebs/>
      </div>
      <Footer />
    </main>
  );
};

export default Hero;
