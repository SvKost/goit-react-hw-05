import { useEffect, useState } from "react";
import { fetchReviews } from "../../services/movies-api";
import { useParams } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Loader } from "../Loader/Loader";
import css from "./MovieReviews.module.css";

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
    <>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={isError} />}
      {movieReviews !== null && movieReviews.length !== 0 && (
        <ul className={css.container}>
          {movieReviews.map(({ id, author, content }) => (
            <li className={css.reviewItem} key={id}>
              <h3 className={css.reviewAuthor}>Author: {author}</h3>
              <p className={css.reviewText}>{content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
