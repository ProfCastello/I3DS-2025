import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";

import Header from "./components/header/Header";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Home from "./pages/Home";
import NaoEncontrado from "./pages/NaoEncontrado";
import Footer from "./components/footer/Footer";
import { useEffect, useState } from "react";

function App() {
  //Faz o react-spring funcionar na versão 19.0.0 do react
  const [, setFuncionaSpring] = useState(0);

  useEffect(() => {
    setFuncionaSpring((prevKey) => prevKey + 1);
  }, []);
  //---------------------------------------------
  return (
    <div className="d-flex flex-column min-vh-100 m-0 p-0">
      <BrowserRouter>
        <Header />

        <main className="d-flex flex-grow-1 flex-column">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="*" element={<NaoEncontrado />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
