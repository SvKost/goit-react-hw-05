import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import { useEffect, useRef, useState } from "react";
import { fetchMovieById } from "../../services/movies-api";
import BackLink from "../../components/BackLink/BackLink";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/movies";
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      const response = await fetchMovieById(movieId);
      setMovieDetails(response);
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <div>
      {movieDetails !== null && movieDetails.length !== 0 && (
        <div>
          <BackLink to={backLinkHref}>Back</BackLink>

          {/* <NavLink to={backlinkRef}>
            <button>Go back</button>
          </NavLink> */}
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
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
