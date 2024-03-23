import axios from "axios";

const API_KEY = "782df108fbec866d431240e30dcb2e3e";

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    // `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key={API_KEY}`

    "https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=782df108fbec866d431240e30dcb2e3e"
  );
  return response.data.results;
};

export const fetchMovieById = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/359410?append_to_response=title&language=en-US&api_key=782df108fbec866d431240e30dcb2e3e"
  );
  return response;
};
