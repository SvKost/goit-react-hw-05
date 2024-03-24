import { NavLink, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

// import HomePage from "./pages/HomePage/HomePage";
// import MoviesPage from "./pages/MoviesPage/MoviesPage";
// import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
// import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
// import MovieReviews from "./components/MovieReviews/MovieReviews";
// import MovieCast from "./components/MovieCast/MovieCast";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));

import css from "./App.module.css";
import { Loader } from "./components/Loader/Loader";

function App() {
  return (
    <div>
      <header className={css.header}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </header>

      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
