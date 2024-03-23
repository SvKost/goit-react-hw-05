import { useEffect, useState } from "react";
import { fetchMoviesByQuery } from "../../services/movies-api";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

const MoviesPage = () => {
  const [movieData, setMovieData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const notify = () =>
    toast("Please enter your query!", {
      position: "top-right",
    });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const { input } = form.elements;

    if (!input.value.trim()) {
      notify();
    } else {
      setSearchQuery(input.value);
    }

    form.reset();
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      const response = await fetchMoviesByQuery(searchQuery);
      setMovieData(response);
    };

    {
      searchQuery !== "" && getMovieDetails();
    }
  }, [setMovieData, searchQuery]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="input" />
        <button type="submit">Search</button>
      </form>
      <Toaster />

      <ul>
        {movieData !== null &&
          movieData.length !== 0 &&
          movieData.map((movie) => {
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

export default MoviesPage;
