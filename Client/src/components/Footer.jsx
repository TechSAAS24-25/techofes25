import React from "react";
import agsLogo from "../assets/sponsor/ags1.png";
import vetriLogo from "../assets/sponsor/vetri.png";
import hgLogo from "../assets/sponsor/hg.png";
import mediLogo from "../assets/sponsor/Medi.png";
import wallpaper from "../assets/footerwallpaper.jpg";
import "./Footer.css";

function Content() {
  return (
    <div className="py-8 px-12 h-full w-full flex flex-col justify-between bg-cover main-footer">
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => {
  return (
    <div className="flex flex-row">
      <Nav />
      <Sponsors />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="text-white flex flex-col items-start">
      <div className="flex justify-between items-end w-full">
        <h1 className="text-[10vw] leading-[0.8] mt-10">TECHOFES'25</h1>
        <p>SAAS CEG</p>
      </div>
      <Contributors />
    </div>
  );
};

const Nav = () => {
  return (
    <div className="flex flex-1 shrink-0 gap-20">
      <div className="flex flex-col gap-2 text-[rgb(159,238,243)]">
        <h3 className="mb-2 uppercase text-[#ffffffc9]">Quick Links</h3>
        <a href="events">Events</a>
        <a href="accommodation">Accommodation</a>
        <a href="contact/team">Contact</a>
        <a href="merchandise">Merchandise</a>
        <a href="contact/query">Queries</a>
      </div>
    </div>
  );
};

const Sponsors = () => {
  return (
    <div className="flex flex-1 flex-col items-start gap-4">
      <h3 className="mb-2 uppercase text-[#ffffffc9]">Our Sponsors</h3>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 w-full">
        <img src={agsLogo} alt="Sponsor 1" className="h-16 w-auto" />
        <img src={vetriLogo} alt="Sponsor 2" className="h-16 w-auto" />
        <img src={hgLogo} alt="Sponsor 3" className="h-16 w-auto" />
        <img src={mediLogo} alt="Sponsor 4" className="h-16 w-auto" />
      </div>
    </div>
  );
};

const Contributors = () => {
  return (
    <div className=" flex lg:flex-row flex-col mt-6 text-sm text-[#ffffff80]">
      <p>Website developed by:</p>
      <ul className="list-none list-inside flex  lg:flex-row flex-col">
        <li>
          <a
            href="https://www.linkedin.com/in/vimalesh-c-t"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline pl-5"
          >
            Vimalesh C T
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/vikrant-ramesh-046061190/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline pl-5"
          >
            Vikrant Ramesh
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/krishnendumr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline pl-5"
          >
            Krishnendu M R
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/rajeshbabu2004/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline pl-5"
          >
            Rajeshbabu S
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/kiruthiga-p-m-61b31028b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline pl-5"
          >
            Kiruthiga P M
          </a>
        </li>
      </ul>
      <p>~ © 2024 AGNI CEG ANNA UNIVERSITY</p>
    </div>
  );
};

export default function Footer() {
  return (
    <div
      className={`relative  bg-center`}
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        height: "70vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed bottom-0 w-full" style={{ height: "70vh" }}>
        <Content />
      </div>
    </div>
  );
}
