import { NavLink, Route, Routes } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

const MovieDetailsPage = () => {
  return (
    <div>
      MovieDetailsPage
      {/* <NavLink to="/MovieCast">MovieCast </NavLink>
      <NavLink to="/MovieReviews">MovieReviews</NavLink> */}
      {/* <Routes>
        <Route path="movieCast" element={<MovieCast />} />
        <Route path="movieReviews" element={<MovieReviews />} />
      </Routes> */}
    </div>
  );
};

export default MovieDetailsPage;
