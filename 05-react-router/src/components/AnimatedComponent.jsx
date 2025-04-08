import React from "react";
import { useSpring, animated } from "@react-spring/web";

const AnimatedComponent = (props) => {
  const styles = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 500 }, // Duração da animação em milissegundos
  });

  return (
    <animated.div style={styles} className="container text-center mt-5">
      <h1 className="display-4">Bem-vindo ao React Spring!</h1>
      <p className="lead">
        Este é um exemplo simples de animação com react-spring e Bootstrap.
      </p>
    </animated.div>
  );
};

export default AnimatedComponent;
