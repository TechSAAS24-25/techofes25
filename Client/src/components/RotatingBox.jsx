import React, { useState, useEffect } from 'react';

const RotatingBox = () => {
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    const box = e.target.getBoundingClientRect();
    const offsetX = e.clientX - box.left;
    const offsetY = e.clientY - box.top;

    const rotateX = (offsetY / box.height) * 30 - 15;
    const rotateY = (offsetX / box.width) * 30 - 15;

    setRotation({ rotateX, rotateY });
  };

  useEffect(() => {
    const boxElement = document.getElementById('box');
    boxElement.addEventListener('mousemove', handleMouseMove);

    return () => {
      boxElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      id="box"
      style={{
        width: '200px',
        height: '200px',
        perspective: '1000px',
        transition: 'transform 0.1s ease-out',
      }}
    >
      <img
        src="https://via.placeholder.com/200"
        alt="Rotating Image"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          transition: 'transform 0.1s ease-out',
          transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
        }}
      />
    </div>
  );
};

export default RotatingBox;
