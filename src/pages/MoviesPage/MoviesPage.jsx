import { useEffect, useState } from "react";
import { fetchMoviesByQuery } from "../../services/movies-api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Loader } from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") ?? "";

  useEffect(() => {
    if (searchQuery === null) return;
    const getMovieDetails = async () => {
      try {
        setIsError(null);
        setIsLoading(true);
        setMovieData(null);

        const response = await fetchMoviesByQuery(searchQuery);
        if (response.length === 0) {
          setIsError(
            "Sorry, there are no movies matching your search query. Please try again!"
          );
          setMovieData(null);
        } else {
          setMovieData(response);
        }
      } catch (error) {
        setIsError(
          "Sorry, there are no movies matching your search query. Please try again!"
        );
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [searchQuery]);

  const handleSearch = (query) => {
    const nextParams = query !== "" ? { query } : {};
    setSearchParams(nextParams);
  };

  return (
    <div>
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
