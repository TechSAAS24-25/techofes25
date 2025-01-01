import styles from "./ZoomParallax.module.scss";
import Picture1 from "../assets/p0fq9cyz.jpg";
import Picture2 from "../assets/party.jpg";
import Picture3 from "../assets/99591842.webp";
import Picture4 from "../assets/images (1).jpeg";
import Picture5 from "../assets/techofes.jpg";
import Picture6 from "../assets/p0fq9cyz.jpg";
import Picture7 from "../assets/p0fq9cyz.jpg";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function ZoomParallax() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  // Opacity and scale for "events" text
  const eventsOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 1]);
  const eventsScale = useTransform(scrollYProgress, [0.4, 1], [0.8, 1]);

  const pictures = [
    {
      src: Picture1,
      scale: scale4,
    },
    {
      src: Picture2,
      scale: scale5,
    },
    {
      src: Picture3,
      scale: scale6,
    },
    {
      src: Picture4,
      scale: scale5,
    },
    {
      src: Picture5,
      scale: scale6,
    },
    {
      src: Picture6,
      scale: scale8,
    },
    {
      src: Picture7,
      scale: scale9,
    },
  ];

  return (
    <div ref={container} className={`${styles.container} bg-black`}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={styles.el}>
              <div className={styles.imageContainer}>
                <img
                  src={src}
                  fill
                  alt="image"
                  placeholder="blur"
                  className="bg-cover"
                />
              </div>
            </motion.div>
          );
        })}
        {/* "Events" text that appears at the end */}
        <motion.div
          style={{
            opacity: eventsOpacity,
            scale: eventsScale,
          }}
          className={`${styles.eventsText} lg:text-7xl text-6xl`}
        >
          Events
        </motion.div>
      </div>
    </div>
  );
}
