import axios from "axios";

const api_key = "?api_key=" + import.meta.env.VITE_API_KEY;

export const getGenre = () => axios.get("https://api.themoviedb.org/3/genre/movie/list" + api_key);
export const getPopularMovies = () => axios.get("https://api.themoviedb.org/3/movie/popular" + api_key);
