import axios from "axios";

const api_key = "?api_key=" + import.meta.env.VITE_API_KEY;

export const getPopularMovies = (page: number) =>
  axios.get("https://api.themoviedb.org/3/movie/popular" + api_key + "&page=" + page);
export const getNowPlayingMovies = (page: number) =>
  axios.get("https://api.themoviedb.org/3/movie/now_playing" + api_key + "&page=" + page);
export const getTopRatedMovies = (page: number) =>
  axios.get("https://api.themoviedb.org/3/movie/top_rated" + api_key + "&page=" + page);
export const getUpcomingMovies = (page: number) =>
  axios.get("https://api.themoviedb.org/3/movie/upcoming" + api_key + "&page=" + page);

export const getSearchMovies = (search: string, page: number) =>
  axios.get("https://api.themoviedb.org/3/search/movie" + api_key + "&query=" + search + "&page=" + page);
