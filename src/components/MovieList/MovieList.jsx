import { NavLink, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";
import MovieItem from "../MovieItem/MovieItem";

const MovieList = ({ data }) => {
  const location = useLocation();

  return (
    <div>
      {data.length > 0 && (
        <ul className={css.listContainer}>
          {data.map((item) => {
            return (
              <li key={item.id} className={css.movieItem}>
                <NavLink
                  className={css.movieLink}
                  to={`/movies/${item.id}`}
                  state={{ from: location }}
                >
                  <MovieItem data={item} />
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MovieList;
