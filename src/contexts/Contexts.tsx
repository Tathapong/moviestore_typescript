import { createContext, useState, useEffect } from "react";
import { ChildrenPropsType } from "../interfaces/interface";
import { SetStateType } from "../interfaces/interface";
import { MoviesType, MoviesPopularApiType } from "../interfaces/interface";
import { Mode, ModeType } from "../constants/mode";
import { getMoviesByMode } from "../utilities/getMovies";

interface ContextPropsType {
  movies: MoviesType[];
  setMovies: SetStateType<MoviesType[]>;

  search: string;
  setSearch: SetStateType<string>;

  cart: number[];
  setCart: SetStateType<number[]>;

  mode: ModeType;
  setMode: SetStateType<ModeType>;

  page: number;
  setPage: SetStateType<number>;

  pageCount: number;
  setPageCount: SetStateType<number>;
}

export const Context = createContext<ContextPropsType | null>(null);

function ContextProvider({ children }: ChildrenPropsType) {
  const [mode, setMode] = useState<ModeType>(Mode.NOW_PLAYING);
  const [movies, setMovies] = useState<MoviesType[]>([]);

  const [search, setSearch] = useState<string>("");
  const [cart, setCart] = useState<number[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await getMoviesByMode({ mode, page, search });
        const results: MoviesPopularApiType[] = Array.from(res.data.results);

        const totalPages: number = res.data.total_pages;

        setMovies(
          results.map((item) => ({
            id: item.id,
            title: item.title,
            vote: item.vote_average,
            releaseDate: item.release_date,
            image: item.poster_path,
            genres: item.genre_ids,
            price: Math.round(Math.random() * 100)
          }))
        );

        setPageCount(totalPages > 100 ? 100 : totalPages);
      };
      fetch();
    } catch (error) {
      console.log(error);
    }
  }, [mode, page, search]);

  useEffect(() => {
    setPage(1);
  }, [mode]);

  return (
    <Context.Provider
      value={{
        mode,
        setMode,
        movies,
        setMovies,
        search,
        setSearch,
        cart,
        setCart,
        page,
        setPage,
        pageCount,
        setPageCount
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
