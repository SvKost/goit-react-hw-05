import { useEffect, useState } from "react";
import { fetchMoviesByQuery } from "../../services/movies-api";
import { useSearchParams } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!searchParams) return;
    const getMovieByQuery = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        setMovieData(null);

        const response = await fetchMoviesByQuery(searchQuery);
        setMovieData(response);
        if (response.length === 0) {
          setIsError(
            "Sorry, there are no movies matching your search query. Please try again!"
          );
          setMovieData(null);
        } else {
          setMovieData(response);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieByQuery();
  }, [searchQuery, searchParams]);

  const handleSearch = (query) => {
    const nextParams = query !== "" ? { query } : {};
    setSearchParams(nextParams);
  };

  return (
    <div className={css.container}>
      <SearchForm onSearch={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={isError} />}
      {movieData !== null && movieData.length !== 0 && (
        <MovieList data={movieData} />
      )}
    </div>
  );
};

export default MoviesPage;
