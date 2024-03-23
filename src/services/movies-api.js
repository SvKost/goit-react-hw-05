import axios from "axios";

const API_KEY = "782df108fbec866d431240e30dcb2e3e";

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    // `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key={API_KEY}`

    "https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=782df108fbec866d431240e30dcb2e3e"
  );
  return response.data.results;
};

export const fetchMovieById = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=782df108fbec866d431240e30dcb2e3e`
  );
  return response.data;
};

export const fetchCredits = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US&api_key=782df108fbec866d431240e30dcb2e3e`
  );
  return response.data;
};

export const fetchReviews = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&api_key=782df108fbec866d431240e30dcb2e3e`
  );
  return response.data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=782df108fbec866d431240e30dcb2e3e`
  );
  return response.data.results;
};
