import React from "react";
import mkLogo from "../assets/sponsor/mk.png";
import Logo from "../assets/logo.png";
import SAAS from "../assets/SAASgold.png";
import Ags from "../assets/ags[1].png";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import hiLogo from "../assets/sponsor/hindu.png";
import riverstone from "../assets/sponsor/riverstone.png";
import "./Footer.css";

function Content() {
  return (
    <div className="py-8 px-12 h-full w-full flex flex-col  bg-cover main-footer">
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => {
  return (
    <div className="flex flex-row flex-wrap items-start justify-between gap-12">
      <Nav />
      <Sponsors />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="text-white flex flex-col items-center justify-center h-auto gap-4">
      {/* Main Logo Centered */}
      <div className="flex flex-col items-center animate-fadeIn">
        <img
          src={Logo}
          alt="Main Logo"
          className="h-auto max-h-48 w-auto max-w-xl mb-2" // Adjusted size and spacing
        />
      </div>

      {/* SAAS Logo Smaller Below */}
      <div className="flex flex-col items-center">
        <img
          src={SAAS}
          alt="SAAS Logo"
          className="h-auto max-h-14 w-auto max-w-sm mb-2" // Adjusted size and spacing
        />
        <p className="text-center text-base mt-2 text-[#ffffffc9] font-semibold">
          SAAS CEG
        </p>
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
              {/* <i className='fab fa-facebook-f'></i> */}
              <FaFacebook />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/saas_ceg/"
              target="_blank"
              rel="noreferrer"
            >
              {/* <img src={insta} alt='' /> */}
              {/* <FaSquareInstagram /> */}
              <FaInstagram />
            </a>
          </li>

          <li>
            <a
              href="mailto:saasceg25@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              {/* <img src={Mail} alt='Email' className='icon mailicon' /> */}
              <IoIosMail />
            </a>
          </li>
          <li>
            <a
              href="https://whatsapp.com/channel/0029VaE66JJ9xVJeMj7E8M08"
              target="_blank"
              rel="noreferrer"
            >
              {/* <img src={waIcon} alt='WhatsApp' className='icon' /> */}
              <FaWhatsapp />
            </a>
          </li>
        </ul>
      </div>

      {/* Copyright and contributors */}
      <div className="text-sm text-[#ffffffd9] text-center w-full">
        <Contributors />
      </div>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-[rgb(200,250,250)]">
        <h3 className="mb-4 uppercase text-white text-xl font-bold tracking-wider">
          Quick Links
        </h3>
        <ul className="flex flex-col gap-2">
          <li>
            <a
              href="events"
              className="hover:text-[#00ffcc] text-lg transition duration-300"
            >
              Events
            </a>
          </li>
          <li>
            <a
              href="accommodation"
              className="hover:text-[#00ffcc] text-lg transition duration-300"
            >
              Accommodation
            </a>
          </li>
          <li>
            <a
              href="contact/team"
              className="hover:text-[#00ffcc] text-lg transition duration-300"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="/merch"
              className="hover:text-[#00ffcc] text-lg transition duration-300"
            >
              Merchandise
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Sponsors = () => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="mb-4 uppercase text-white text-xl font-bold tracking-wider">
        Our Sponsors
      </h3>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 w-full">
        <img
          src={Ags}
          alt="Sponsor 1"
          className="h-16 w-auto transition-transform duration-300 hover:scale-110"
        />
        <img
          src={mkLogo}
          alt="Sponsor 2"
          className="h-20 w-auto transition-transform duration-300 hover:scale-110"
        />
        <img
          src={hiLogo}
          alt="Sponsor 3"
          className="h-20 w-auto transition-transform duration-300 hover:scale-110"
        />
        <img
          src={riverstone}
          alt="Sponsor 4"
          className="h-20 w-auto transition-transform duration-300 hover:scale-110"
        />
        {/* 
        <img
          src={hgLogo}
          alt="Sponsor 3"
          className="h-16 w-auto transition-transform duration-300 hover:scale-110"
        />
        <img
          src={mediLogo}
          alt="Sponsor 4"
          className="h-16 w-auto transition-transform duration-300 hover:scale-110"
        /> */}
      </div>
    </div>
  );
};

const Contributors = () => {
  return (
    <div className="flex flex-col mt-6 text-sm z-10 gap-2">
      <p className="text-[#00ffcc] font-semibold">
        Website developed by:{" "}
        <span className="text-white">Technical Design SAAS</span>
      </p>
      <ul className="list-none flex flex-wrap justify-center gap-4">
        <li>
          <a
            href="https://www.linkedin.com/in/vimalesh-c-t"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ffcc] hover:underline font-medium"
          >
            Vimalesh C T
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/vikrant-ramesh-046061190/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ffcc] hover:underline font-medium"
          >
            Vikrant Ramesh
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/krishnendumr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ffcc] hover:underline font-medium"
          >
            Krishnendu M R
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/rajeshbabu2004/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ffcc] hover:underline font-medium"
          >
            Rajeshbabu S
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/kiruthiga-p-m-61b31028b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00ffcc] hover:underline font-medium"
          >
            Kiruthiga P M
          </a>
        </li>
      </ul>
      <p className="text-white text-center text-base mt-2">
        ~ © 2024-25 SAAS CEG ANNA UNIVERSITY
      </p>
    </div>
  );
};
export default function Footer() {
  return (
    <div
      className="footer-container  relative bg-center h-[200vh] lg:h-[150vh]"
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute bottom-0 w-full h-full">
        <Content />
      </div>
    </div>
  );
}
