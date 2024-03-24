import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCredits } from "../../services/movies-api";
import { useState } from "react";
import { Loader } from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

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
        <ul>
          {movieCredits.cast.map((item) => (
            <li key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                alt={`Photo of ${item.original_name}`}
              />
              <p>{item.original_name}</p>
              <p>Character: {item.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
