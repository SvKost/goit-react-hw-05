import { NavLink, useLocation } from "react-router-dom";

const MovieList = ({ data }) => {
  const location = useLocation();

  return (
    <div>
      <ul>
        {data.map((item) => {
          return (
            <li key={item.id}>
              <NavLink
                state={{ from: location }}
                to={`/movies/${item.id}`}
                // key={item.id}
              >
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieList;
