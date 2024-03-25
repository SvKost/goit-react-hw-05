import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCredits } from "../../services/movies-api";
import { useState } from "react";
import { Loader } from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";
import defaultImg from "../../assets/img/image-not-found.png";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCredits, setMovieCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const getMovieCredits = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetchCredits(movieId);
        if (response.length === 0) {
          setIsError(
            "Sorry, we don't have information about cast for this movie."
          );
          setMovieCredits(null);
        } else {
          setMovieCredits(response);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieCredits();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={isError} />}

      {movieCredits !== null && movieCredits.length !== 0 && (
        <ul className={css.container}>
          {movieCredits.cast.map((item) => (
            <li className={css.actorItem} key={item.id}>
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                    : defaultImg
                }
                alt={`Photo of ${item.original_name}`}
                width="200px"
                height="300px"
              />
              <div className={css.actorDesc}>
                <h3 className={css.actorName}>{item.original_name}</h3>
                <p className={css.actorCharacter}>
                  <span>Character:</span> {item.character}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
