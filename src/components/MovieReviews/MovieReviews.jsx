import { useEffect, useState } from "react";
import { fetchReviews } from "../../services/movies-api";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const { movieId } = useParams();
  console.log(movieId);

  const [movieReviews, setMovieReviews] = useState(null);

  useEffect(() => {
    const getMovieReviews = async () => {
      const response = await fetchReviews(movieId);
      setMovieReviews(response);
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
