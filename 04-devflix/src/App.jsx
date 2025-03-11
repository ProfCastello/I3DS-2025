import "./App.css";
import Footer from "./components/footer/Footer";
import MovieCard from "./components/movieCard/MovieCard";
// import Logo from "";

function App() {

  const movies = [
    {
      year: "2014",
      type: "Sci-Fi",
      title: "Interstellar",
      director: "Christopher Nolan",
      rating: 8.6,
      poster: "https://image.tmdb.org/t/p/w300/qgW5ZP6ox77d9heR9ZxTxTO1Tuj.jpg"
    },
    {
      year: "2010",
      type: "Action",
      title: "Inception",
      boxOffice: "$836.8M",
      rating: 8.8,
      poster: "https://image.tmdb.org/t/p/w300/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
    }
  ];
  return (
    <div id="app">
      <img className="logo" src={"https://placehold.co/200x200"} alt="" />

      <div className="search">
        <input type="text" placeholder="Pesquise por filmes" />
        <img src={"https://placehold.co/20x20"} alt="" />
      </div>

      <MovieCard
        year={2024}
        type={"Movie"}
        title={"Batman"}
        poster={"https://placehold.co/300x444"}
      />

      <MovieCard
        year={2025}
        type={"Serie"}
        title={"NovoEnsinoMédio o Retorno"}
        poster={"https://placehold.co/300x444"}
        description={
          "Descricao alternativa para o titulo que bnasi saifnia iajsdijijghaiok?"
        }
      />

      <Footer
        devName={" ProfCastello"}
        devLink={"https://github.com/ProfCastello"}
      />
    </div>
  );
}

export default App;
