import React, { useState, useEffect } from "react";
import AnimatedComponent from "../components/AnimatedComponent";

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h2 className="mb-4">Bem-vindo à Página Inicial</h2>
        <p className="lead">
          Este é um exemplo simples de uma página inicial estilizada com
          Bootstrap.
        </p>
        {/* Passa uma chave única para forçar a re-renderização */}
        <AnimatedComponent />
        <button className="btn btn-primary mt-3">Saiba Mais</button>
      </div>
    </div>
  );
};

export default Home;
