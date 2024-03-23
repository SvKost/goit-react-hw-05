import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/movies-api";
import MovieList from "../../components/MovieList/MovieList";

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
      {movies !== null && movies.length !== 0 && <MovieList data={movies} />}
    </div>
  );
};

export default HomePage;
