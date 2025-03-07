import React, { useState } from "react";

const Notification = () => {
  const [isVisible, setIsVisible] = useState(true);
  const message = (
    <>
      For any website-related queries, mail:{" "}
      <a href="mailto:tech.saas2024@gmail.com" className="underline">
        tech.saas2024@gmail.com
      </a>
    </>
  );

  if (!isVisible) return null; // Hide if dismissed

  return (
    <div className="fixed top-0 left-0 w-full bg-blue-600 text-white text-center py-2 shadow-md z-50">
      <p className="text-sm md:text-base">{message}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 px-2 py-1 rounded-md text-xs"
      >
        ✖
      </button>
    </div>
  );
};

export default Notification;
