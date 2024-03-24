import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { fetchMovieById } from "../../services/movies-api";
import { Loader } from "../../components/Loader/Loader";
import BackLink from "../../components/BackLink/BackLink";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
// import MovieCast from "../../components/MovieCast/MovieCast";
// import MovieReviews from "../../components/MovieReviews/MovieReviews";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/movies";
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    const getMovieDetails = async () => {
      try {
        setIsError(null);
        setIsLoading(true);
        const response = await fetchMovieById(movieId);
        setMovieDetails(response);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <div>
      <BackLink to={backLinkHref}>Back</BackLink>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={isError} />}
      {movieDetails !== null && movieDetails.length !== 0 && (
        <div>
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
                movieDetails.genres
                  .map((genre) => {
                    return genre.name;
                  })
                  .join(",")}
            </div>
          </div>
          <div>
            <p>Additional information</p>

            <ul>
              <NavLink to="cast">Cast</NavLink>
              <NavLink to="reviews">Reviews</NavLink>
            </ul>
            <Suspense>
              <Routes>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
