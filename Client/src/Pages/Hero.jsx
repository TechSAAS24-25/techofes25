import React, { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Lenis from "lenis";
import FoodBackground1 from "../assets/food/general/food (3).svg";
import FoodBackground2 from "../assets/food/general/food (6).svg";
import CubeBackground from "../components/Cubebackground";
import Dish1 from "../assets/food/Desserts/food (9).svg";
import Dish2 from "../assets/food/Fast Food/food (5).svg";
import Dish3 from "../assets/food/Fast Food/food (8).svg";
import AboutSection from "../components/About";
import ZoomParallax from "../components/ZoomParallax";
import EventScroll from "../components/EventScroll";
import Footer from "../components/Footer";
import "../Styles/Hero.css";

const Slide = (props) => {
  const direction = props.direction === "left" ? -1 : 1;
  const translateX = useTransform(
    props.progress,
    [0, 0.9],
    [150 * direction, -150 * direction]
  );
  return (
    <motion.div
      style={{ x: translateX, left: props.left }}
      className="relative flex whitespace-nowrap"
    >
      <Phrase src={props.src} />
      <Phrase src={props.src} />
      <Phrase src={props.src} />
    </motion.div>
  );
};

const Phrase = ({ src }) => {
  return (
    <div className="px-5 py-1 flex gap-5 items-center text-white michroma">
      <p className="text-[2vw]">EVENT </p>
      <span className="relative h-[6vw] aspect-[4/2] rounded-full overflow-hidden">
        <img style={{ objectFit: "cover" }} src={Dish1} alt="image" fill />
      </span>
      <p className="text-[2vw]">DJ NIGHT </p>
      <span className="relative h-[6vw] aspect-[4/2] rounded-full overflow-hidden">
        <img style={{ objectFit: "cover" }} src={Dish2} alt="image" fill />
      </span>
      <p className="text-[2vw]">WORKSHOPS</p>
      <span className="relative h-[6vw] aspect-[4/2] rounded-full overflow-hidden">
        <img
          style={{ objectFit: "cover" }}
          src={FoodBackground2}
          alt="image"
          fill
        />
      </span>
      <p className="text-[2vw]">MERCH</p>
      <span className="relative h-[6vw] aspect-[4/2] rounded-full overflow-hidden">
        <img
          style={{ objectFit: "cover" }}
          src={FoodBackground1}
          alt="image"
          fill
        />
      </span>
      <p className="text-[2vw]">T-AWARDS</p>
      <span className="relative h-[6vw] aspect-[4/2] rounded-full overflow-hidden">
        <img style={{ objectFit: "cover" }} src={Dish3} alt="image" fill />
      </span>
    </div>
  );
};

export default function Hero() {
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

  const container1 = useRef();
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: container1,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress1, [0, 1], ["0vh", "150vh"]);

  const container2 = useRef();
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: container2,
    offset: ["start end", "end start"],
  });

  const slideContainer = useRef();
  const { scrollYProgress: slideScrollYProgress } = useScroll({
    target: slideContainer,
    offset: ["start end", "end start"],
  });

  return (
    <main>
      <div
        className="overflow-hidden"
        style={{
          backgroundImage: `url(${FoodBackground1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="z-0 fixed transform lg:translate-x-1/2 lg:-translate-y-52 w-full h-full">
          <CubeBackground />
        </div>
        <motion.div style={{ y: y1 }} className="relative z-10">
          <div className="pb-52 text-left home">
            <p className="font-extralight lg:text-8xl text-4xl text-white ttitle">
              Symphony of Taste
            </p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center h-screen z-10 bg-gradient-to-b to-yellow-500 from-orange-700 justify-start">
        <AboutSection />
      </div>

      <div
        ref={slideContainer}
        className="relative overflow-hidden bg-black py-6"
      >
        <Slide
          src={Dish1}
          direction={"left"}
          left={"-40%"}
          progress={slideScrollYProgress}
        />
        <Slide
          src={Dish2}
          direction={"right"}
          left={"-25%"}
          progress={slideScrollYProgress}
        />
      </div>

      <ZoomParallax />
      <EventScroll />

      <div  
        ref={container2}
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
