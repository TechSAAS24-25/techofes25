import { useEffect, useRef, useState } from "react";
import styles from "./EventScroll.module.scss";
import Lenis from "lenis";
import { useTransform, useScroll, motion } from "framer-motion";
import event1 from "../../public/media/events/chronicles.jpg";
import event2 from "../../public/media/events/classical.jpg";
import event3 from "../../public/media/events/tribe.jpg";
import event4 from "../../public/media/events/singing.jpeg";
import event5 from "../../public/media/events/poetry.jpg";
import event6 from "../../public/media/events/melody.jpeg";
import event7 from "../../public/media/events/escape.jpg";
import event8 from "../../public/media/events/dj.jpeg";
import event9 from "../../public/media/events/dance.jpeg";
import event10 from "../../public/media/events/speak.jpg";
import event11 from "../../public/media/events/pop.jpg";
import event12 from "../../public/media/events/film-making.jpeg";

const images = [
  event1,
  event2,
  event3,
  event4,
  event5,
  event6,
  event7,
  event8,
  event9,
  event10,
  event11,
  event12,
];

export default function EventScroll() {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main>
      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
      {/* <div className={styles.spacer}></div> */}
    </main>
  );
}

const Column = ({ images, y }) => {
  return (
    <motion.div className={styles.column} style={{ y }}>
      {images.map((src, i) => {
        return (
          <div key={i} className={styles.imageContainer}>
            <img src={`${src}`} alt="image" fill />
          </div>
        );
      })}
    </motion.div>
  );
};
