import { NavLink, Route, Routes } from "react-router-dom";
import MovieDetailsPage from "../MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const HomePage = ({ movies }) => {
  return (
    <div>
      <h1>Tranding Today</h1>
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <NavLink to="/movieDetails/${movie.id}" key={movie.id}>
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
