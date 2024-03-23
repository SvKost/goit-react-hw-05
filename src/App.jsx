import css from "./App.module.css";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieById, fetchTrendingMovies } from "./services/movies-api";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import MovieCast from "./components/MovieCast/MovieCast";

function App() {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetchTrendingMovies();
      setMovies(response);
    };

    getMovies();
  }, []);

  return (
    <div>
      <header className={css.header}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
