import React from "react";
import agsLogo from "../assets/sponsor/ags1.png";
import mailIcon from "../assets/mail.svg";
import waIcon from "../assets/wa.svg";
import Logo from "../assets/logo.png";
import saas from "../assets/saasgold.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container relative h-[150vh] lg:h-[100vh]">
      <div className="footer-content">
        <Section1 />
        <Section2 />
      </div>
    </footer>
  );
}

const Section1 = () => (
  <div className="section-1">
    <Nav />
    <Sponsors />
  </div>
);

const Section2 = () => (
  <div className="section-2">
    <div className="logo-container">
      <img src={Logo} alt="Main Logo" className="main-logo" />
      <img src={saas} alt="SAAS Logo" className="saas-logo" />
      <p className="saas-text">SAAS CEG</p>
    </div>

    <div className="contact-section">
      <p className="contact-title">Contact Us</p>
      <ul className="contact-icons">
        <li>
          <a
            href="https://www.facebook.com/techofes.co.in"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/saas_ceg/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </li>
        <li>
          <a href="mailto:saasceg25@gmail.com" target="_blank" rel="noreferrer">
            <img src={mailIcon} alt="Email" className="icon" />
          </a>
        </li>
        <li>
          <a
            href="https://whatsapp.com/channel/0029VaE66JJ9xVJeMj7E8M08"
            target="_blank"
            rel="noreferrer"
          >
            <img src={waIcon} alt="WhatsApp" className="icon" />
          </a>
        </li>
      </ul>
    </div>

    <Contributors />
  </div>
);

const Nav = () => (
  <div className="nav-section">
    <h3 className="nav-title">Quick Links</h3>
    <ul className="nav-links">
      <li>
        <a href="events">Events</a>
      </li>
      <li>
        <a href="accommodation">Accommodation</a>
      </li>
      <li>
        <a href="contact/team">Contact</a>
      </li>
      <li>
        <a href="/merch">Merchandise</a>
      </li>
    </ul>
  </div>
);

const Sponsors = () => (
  <div className="sponsors-section">
    <h3 className="sponsors-title">Our Sponsors</h3>
    <div className="sponsor-logos">
      <img src={agsLogo} alt="Sponsor" className="sponsor-logo" />
    </div>
  </div>
);

const Contributors = () => (
  <div className="contributors-section">
    <p>
      Website developed by:{" "}
      <span className="highlight">Technical Design SAAS</span>
    </p>
    <ul className="contributors-list">
      <li>
        <a href="https://www.linkedin.com/in/vimalesh-c-t" target="_blank">
          Vimalesh C T
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/vikrant-ramesh-046061190/"
          target="_blank"
        >
          Vikrant Ramesh
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/krishnendumr/" target="_blank">
          Krishnendu M R
        </a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/rajeshbabu2004/" target="_blank">
          Rajeshbabu S
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/kiruthiga-p-m-61b31028b"
          target="_blank"
        >
          Kiruthiga P M
        </a>
      </li>
    </ul>
    <p className="copyright">© 2024-25 SAAS CEG ANNA UNIVERSITY</p>
  </div>
);

export default Footer;
