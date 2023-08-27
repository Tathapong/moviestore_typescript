import {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getSearchMovies
} from "../service/api";
import { Mode, ModeType } from "../constants/mode";

interface GetMovieProps {
  mode: ModeType;
  page: number;
  search: string;
}

export function getMoviesByMode({ mode, page, search }: GetMovieProps) {
  if (mode === Mode.POPULAR) return getPopularMovies(page);
  else if (mode === Mode.TOP_RATED) return getTopRatedMovies(page);
  else if (mode === Mode.UPCOMING) return getUpcomingMovies(page);
  else if (mode === Mode.SEARCH) return getSearchMovies(search, page);
  else return getNowPlayingMovies(page);
}
