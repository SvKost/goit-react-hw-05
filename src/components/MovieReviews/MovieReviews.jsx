import { useEffect, useState } from "react";
import { fetchReviews } from "../../services/movies-api";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const getMovieReviews = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        setMovieReviews(null);

        const response = await fetchReviews(movieId);
        if (response.length === 0) {
          setIsError("Sorry, there are no reviews for this movie");
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
      <ul>
        {movieReviews !== null && movieReviews.length !== 0 ? (
          movieReviews.map((review) => (
            <li key={review.id}>
              <p>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <p>Sorry, there are no reviews for this film.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
