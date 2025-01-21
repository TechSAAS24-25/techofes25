import styles from "./Carousel.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useRef, useEffect, useState } from "react";

const CarouselCard = ({
  imgSrc,
  name,
  position,
  roles = [],
  instagramLink,
  linkedinLink,
}) => {
  return (
    <div className={styles["card-wrapper"]}>
      <article className={styles.card}>
        <figure className={styles["card-visual"]}>
          <img
            src={imgSrc}
            alt={name}
            onError={(e) => {
              e.target.src = "path/to/fallback/image.jpg";
            }}
          />
        </figure>
        <main className={styles["card-content"]}>
          <h3 className={styles["card-heading"]}>{name}</h3>
          <p className={styles["card-position"]}>{position}</p>
          {roles.length > 0 && (
            <ul className={styles["card-footer"]}>
              {roles.map((role, i) => (
                <li key={i + role}>
                  <span className={styles.role}>{role}</span>
                  {i < roles.length - 1 && <span className={styles.sep} />}
                </li>
              ))}
            </ul>
          )}
          <div className={styles["card-links"]}>
            {instagramLink && (
              <a href={instagramLink} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon
                  icon={faInstagram}
                  style={{ color: "white" }}
                />
              </a>
            )}
            {linkedinLink && (
              <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} style={{ color: "white" }} />
              </a>
            )}
          </div>
        </main>
      </article>
    </div>
  );
};

const Carousel = ({ cardsList = [] }) => {
  const cardsWrapperRef = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const slideCarousel = (direction) => {
    const cardsContainer = cardsWrapperRef.current;
    cardsContainer.classList.add(styles["-sliding"]);

    if (direction === "next") {
      cardsContainer.appendChild(
        cardsContainer.removeChild(cardsContainer.firstChild)
      );
    } else {
      cardsContainer.prepend(
        cardsContainer.removeChild(cardsContainer.lastChild)
      );
    }

    setTimeout(() => {
      cardsContainer.classList.remove(styles["-sliding"]);
    }, 300);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      slideCarousel("next");
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  // Handle mouse movement for custom cursor
  const handleMouseMove = (e) => {
    setCursorVisible(true);
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setCursorVisible(false);
  };

  return (
    <div
      className={styles.carousel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles["c-cards-wrapper"]} ref={cardsWrapperRef}>
        {cardsList.map((card, i) => (
          <CarouselCard key={i} {...card} />
        ))}
      </div>
      {cursorVisible && (
        <div
          className={styles["c-gallery-cursor"]}
          style={{ left: cursorPosition.x, top: cursorPosition.y }}
        />
      )}
      <button
        className={styles["arrow-left"]}
        onClick={() => slideCarousel("prev")}
        aria-label="Previous Slide"
      >
        &#8249; {/* Left arrow symbol */}
      </button>
      <button
        className={styles["arrow-right"]}
        onClick={() => slideCarousel("next")}
        aria-label="Next Slide"
      >
        &#8250; {/* Right arrow symbol */}
      </button>
    </div>
  );
};

export default Carousel;
