import { useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import MovieCard from "./components/movieCard/MovieCard";
// import Logo from "";

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  //Utilizando chave de API do arquivo .env
  const apiKey = 
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  return (
    <div id="app">
      <img className="logo" src={"https://placehold.co/200x200"} alt="" />

      <div className="search">
        <input type="text" placeholder="Pesquise por filmes" />
        <img src={"https://placehold.co/20x20"} alt="" />
      </div>

      {movies.map((movie, index) => (
        <MovieCard key={index} {...movie} />
      ))}

      <Footer
        devName={" ProfCastello"}
        devLink={"https://github.com/ProfCastello"}
      />
    </div>
  );
};

export default App;
