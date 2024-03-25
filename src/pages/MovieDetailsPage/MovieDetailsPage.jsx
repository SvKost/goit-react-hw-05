import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { fetchMovieById } from "../../services/movies-api";
import { Loader } from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import defaultImg from "../../assets/img/image-not-found.png";
import BackLink from "../../components/BackLink/BackLink";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const buildLinkClass = ({ isActive }) => {
  return clsx(css.additionalBtn, isActive && css.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    const getMovieDetails = async () => {
      setIsError(null);
      setIsLoading(true);
      try {
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
    <div className={css.container}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage message={isError} />}
      <BackLink to={backLinkRef.current}>Back</BackLink>
      {movieDetails !== null && movieDetails.length !== 0 && (
        <div className={css.movieContainer}>
          <div className={css.movieContainerUp}>
            <img
              width={300}
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                  : defaultImg
              }
              alt={`Poster for ${movieDetails.title}`}
            />

            <div className={css.movieDesc}>
              <h1>{movieDetails.title}</h1>
              <p>
                User score: <b>{movieDetails.vote_average}</b>
              </p>
              <h2>Overview</h2>
              <p>{movieDetails.overview}</p>

              <h3>Genres</h3>
              <div>
                {movieDetails.genres &&
                  movieDetails.genres
                    .map((genre) => {
                      return genre.name;
                    })
                    .join(", ")}
              </div>
            </div>
          </div>
          <div>
            <div className={css.additionalContainer}>
              <NavLink
                className={buildLinkClass}
                to="cast"
                state={{ from: backLinkRef.current }}
              >
                Cast
              </NavLink>
              <NavLink
                className={buildLinkClass}
                to="reviews"
                state={{ from: backLinkRef.current }}
              >
                Reviews
              </NavLink>
            </div>
            <Suspense fallback={<Loader />}>
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
