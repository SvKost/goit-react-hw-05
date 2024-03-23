import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCredits } from "../../services/movies-api";
import { useState } from "react";

const MovieCast = () => {
  const { movieId } = useParams();
  console.log(movieId);

  const [movieCredits, setMovieCredits] = useState(null);

  useEffect(() => {
    const getMovieCredits = async () => {
      const response = await fetchCredits(movieId);
      setMovieCredits(response);
    };

    getMovieCredits();
  }, [movieId]);

  return (
    <div>
      <p>cast</p>
      <ul>
        {movieCredits !== null &&
          movieCredits !== 0 &&
          movieCredits.cast.map((item) => (
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
    </div>
  );
};

export default MovieCast;
