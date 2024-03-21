import css from "./App.module.css";
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrendingMovies } from "./services/movies-api";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import MovieCast from "./components/MovieCast/MovieCast";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await getTrendingMovies();
      setMovies(response);
    };

    getMovies();
  }, []);

  return (
    <div>
      <nav className={css.nav}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage movies={movies} />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movieDetails/:movieId" element={<MovieDetailsPage />} />
        <Route
          path="/movieDetails/:movieId/reviews"
          element={<MovieReviews />}
        />
        <Route path="/movieDetails/:movieId/cast" element={<MovieCast />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
