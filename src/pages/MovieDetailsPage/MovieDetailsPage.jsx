import { NavLink, Route, Routes, useParams } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import { useEffect, useState } from "react";
import { fetchCredits, fetchMovieById } from "../../services/movies-api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const response = await fetchMovieById(movieId);
      setMovieDetails(response);
    };

    getMovieDetails();
  }, [movieId]);

  useEffect(() => {
    const getMovieCredits = async () => {
      const response = await fetchCredits(movieId);
      setMovieCredits(response);
      console.log(response);
    };

    getMovieCredits();
  }, [movieId]);

  return (
    <div>
      {movieDetails !== null && (
        <div>
          <NavLink to="/">
            <button>Go back</button>
          </NavLink>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
              alt={`Poster for ${movieDetails.title}`}
            />
            <h1>{movieDetails.title}</h1>
            <p>User score: {movieDetails.vote_average}</p>
            <h2>Overview</h2>
            <p>{movieDetails.overview}</p>

            <h3>Genres</h3>
            <div>
              {movieDetails.genres &&
                movieDetails.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
            </div>
          </div>
          <div>
            <p>Additional information</p>

            <ul>
              <NavLink to="cast">Cast</NavLink>
              <NavLink to="reviews">Reviews</NavLink>
            </ul>
            <Routes>
              <Route
                path="cast"
                element={<MovieCast movieCredits={movieCredits} />}
              />
              <Route path="reviews" element={<MovieReviews />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
