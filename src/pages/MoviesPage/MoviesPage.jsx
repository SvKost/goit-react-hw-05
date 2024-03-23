import { useEffect, useState } from "react";
import { fetchMoviesByQuery } from "../../services/movies-api";
import toast, { Toaster } from "react-hot-toast";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movieData, setMovieData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");

  // const [savedMovieData, setSavedMovieData] = useState(null);

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
      setSearchParams({ query: input.value });
    }
    form.reset();
  };

  useEffect(() => {
    if (searchQuery === null) return;

    const getMovieDetails = async () => {
      const response = await fetchMoviesByQuery(searchQuery);
      setMovieData(response);
    };

    getMovieDetails();
  }, [setMovieData, searchQuery]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="input" />
        <button type="submit">Search</button>
      </form>
      <Toaster />

      {movieData !== null && movieData.length !== 0 && (
        <MovieList data={movieData} />
      )}
    </div>
  );
};

export default MoviesPage;
