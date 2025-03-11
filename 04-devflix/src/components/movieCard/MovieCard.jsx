import styles from "./MovieCard.module.css";

const MovieCard = (props) => {
  return (
    <div className={styles.movie}>
      <div>
        <p>{props.year}</p>
      </div>

      <img src={props.poster} alt="" />
      <h4>{props.type}</h4>
      <h3>{props.title}</h3>
    </div>
  );
};

export default MovieCard;