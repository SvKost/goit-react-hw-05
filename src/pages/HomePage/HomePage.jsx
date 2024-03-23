import { NavLink } from "react-router-dom";

const HomePage = ({ movies }) => {
  return (
    <div>
      <h1>Tranding Today</h1>
      <ul>
        {movies.map((movie) => {
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
