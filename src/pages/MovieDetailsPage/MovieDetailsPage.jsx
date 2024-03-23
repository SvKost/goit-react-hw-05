import { NavLink, Route, Routes, useParams } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  return (
    <div>
      ID - {movieId}
      <NavLink to="/">
        <button>Go back</button>
      </NavLink>
      <div>
        <img src="#" alt="" />
        <h1></h1>
        <p>User score: ...%</p>
        <h2>Overview</h2>
        <p>overview details</p>

        <h3>Genres</h3>
        <p>drama hist war</p>
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
  );
};

export default MovieDetailsPage;
