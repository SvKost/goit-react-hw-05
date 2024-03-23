import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchTrendingMovies } from "../../services/movies-api";

const HomePage = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetchTrendingMovies();
      setMovies(response);
    };

    getMovies();
  }, []);

  return (
    <div>
      <h1>Tranding Today</h1>
      <ul>
        {movies !== null &&
          movies !== 0 &&
          movies.map((movie) => {
            return (
              <li key={movie.id}>
                <NavLink to={`/movies/${movie.id}`} key={movie.id}>
                  {movie.title}
                </NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default HomePage;
