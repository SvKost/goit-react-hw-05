import { useEffect, useState } from "react";
import { fetchReviews } from "../../services/movies-api";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Loader } from "../Loader/Loader";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const getMovieReviews = async () => {
      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetchReviews(movieId);
        if (response.length === 0) {
          setIsError("Sorry, there are no reviews for this movie.");
          setMovieReviews(null);
        } else {
          setMovieReviews(response);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={isError} />}
      {movieReviews !== null && movieReviews.length !== 0 && (
        <ul>
          {movieReviews.map(({ id, author, content }) => (
            <li key={id}>
              <h3>Author: {author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
