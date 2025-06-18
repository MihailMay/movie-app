const API_KEY = "2ef4dd9a6137d7c76afbd91652af6a40";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = () => {
  return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`)
    .then(response => response.json());
};