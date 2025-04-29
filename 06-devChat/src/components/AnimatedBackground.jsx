import React, { useEffect, useRef } from "react";
import "./AnimatedBackground.css";

const AnimatedBackground = () => {
  const backgroundRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const elements = backgroundRef.current.querySelectorAll(".circle");

      elements.forEach((circle, index) => {
        const speed = (index + 1) * 0.05; // Velocidade baseada no índice
        const x = (window.innerWidth / 2 - clientX) * speed;
        const y = (window.innerHeight / 2 - clientY) * speed;

        circle.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div ref={backgroundRef} className="animated-background">
      {/* Elementos animados */}
      {[...Array(10)].map((_, i) => (
        <div key={i} className="circle"></div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
