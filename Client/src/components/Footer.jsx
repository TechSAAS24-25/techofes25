import React from "react";

function Content() {
  return (
    <div className="bg-gray-700 py-8 px-12 h-full w-full flex flex-col justify-between">
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => {
  return (
    <div>
      <Nav />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="text-white flex justify-between items-end">
      <h1 className="text-[10vw] leading-[0.8] mt-10">TECHOFES'25</h1>
      <p>SAAS CEG</p>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="flex shrink-0 gap-20">
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-[#ffffff80]">About</h3>
        <p>Home</p>
        <p>Projects</p>
        <p>Our Mission</p>
        <p>Contact Us</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-[#ffffff80]">Education</h3>
        <p>News</p>
        <p>Learn</p>
        <p>Certification</p>
        <p>Publications</p>
      </div>
    </div>
  );
};

export default function Footer() {
  return (
    <div
      className="relative"
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
        height: "80vh",
      }}
    >
      <div className="fixed bottom-0 w-full" style={{ height: "80vh" }}>
        <Content />
      </div>
    </div>
  );
}
