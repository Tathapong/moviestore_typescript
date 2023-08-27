import { MoviesType } from "../interfaces/interface";

const MOVIE_STORE = "MOVIE_STORE";

export const setLocalStorage = (value: MoviesType[]) => localStorage.setItem(MOVIE_STORE, JSON.stringify(value));
export const getLocalStorage = () => localStorage.getItem(MOVIE_STORE);
