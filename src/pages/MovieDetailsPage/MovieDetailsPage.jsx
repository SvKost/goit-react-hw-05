import { NavLink, Route, Routes, useParams } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import { useEffect, useState } from "react";
import { fetchMovieById } from "../../services/movies-api";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    const getMovieDetails = async () => {
      const response = await fetchMovieById(movieId);
      setMovieDetails(response);
    };

    getMovieDetails();
  }, [movieId]);

  return (
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
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
// {
//   "adult": false,
//   "backdrop_path": "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
//   "belongs_to_collection": null,
//   "budget": 63000000,
//   "genres": [
//     {
//       "id": 18,
//       "name": "Drama"
//     },
//     {
//       "id": 53,
//       "name": "Thriller"
//     },
//     {
//       "id": 35,
//       "name": "Comedy"
//     }
//   ],
//   "homepage": "http://www.foxmovies.com/movies/fight-club",
//   "id": 550,
//   "imdb_id": "tt0137523",
//   "original_language": "en",
//   "original_title": "Fight Club",
//   "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
//   "popularity": 61.416,
//   "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
//   "production_companies": [
//     {
//       "id": 508,
//       "logo_path": "/7cxRWzi4LsVm4Utfpr1hfARNurT.png",
//       "name": "Regency Enterprises",
//       "origin_country": "US"
//     },
//     {
//       "id": 711,
//       "logo_path": "/tEiIH5QesdheJmDAqQwvtN60727.png",
//       "name": "Fox 2000 Pictures",
//       "origin_country": "US"
//     },
//     {
//       "id": 20555,
//       "logo_path": "/hD8yEGUBlHOcfHYbujp71vD8gZp.png",
//       "name": "Taurus Film",
//       "origin_country": "DE"
//     },
//     {
//       "id": 54051,
//       "logo_path": null,
//       "name": "Atman Entertainment",
//       "origin_country": ""
//     },
//     {
//       "id": 54052,
//       "logo_path": null,
//       "name": "Knickerbocker Films",
//       "origin_country": "US"
//     },
//     {
//       "id": 4700,
//       "logo_path": "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
//       "name": "The Linson Company",
//       "origin_country": "US"
//     },
//     {
//       "id": 25,
//       "logo_path": "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
//       "name": "20th Century Fox",
//       "origin_country": "US"
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "US",
//       "name": "United States of America"
//     }
//   ],
//   "release_date": "1999-10-15",
//   "revenue": 100853753,
//   "runtime": 139,
//   "spoken_languages": [
//     {
//       "english_name": "English",
//       "iso_639_1": "en",
//       "name": "English"
//     }
//   ],
//   "status": "Released",
//   "tagline": "Mischief. Mayhem. Soap.",
//   "title": "Fight Club",
//   "video": false,
//   "vote_average": 8.433,
//   "vote_count": 26280
// }
