import { createContext, useState, useEffect } from "react";
import { ChildrenPropsType } from "../interfaces/interface";
import { SetStateType } from "../interfaces/interface";
import { MoviesType, MoviesPopularApiType } from "../interfaces/interface";
import { Mode, ModeType } from "../constants/mode";
import { getMoviesByMode } from "../utilities/getMovies";

import { getLocalStorage } from "../utilities/localStorage";

interface ContextPropsType {
  movies: MoviesType[];
  setMovies: SetStateType<MoviesType[]>;

  search: string;
  setSearch: SetStateType<string>;

  cart: MoviesType[];
  setCart: SetStateType<MoviesType[]>;

  total: number;
  setTotal: SetStateType<number>;

  discount: number;
  setDiscount: SetStateType<number>;

  mode: ModeType;
  setMode: SetStateType<ModeType>;

  page: number;
  setPage: SetStateType<number>;

  pageCount: number;
  setPageCount: SetStateType<number>;

  timer: number;
  setTimer: SetStateType<number>;
}

export const Context = createContext<ContextPropsType | null>(null);

function ContextProvider({ children }: ChildrenPropsType) {
  const [mode, setMode] = useState<ModeType>(Mode.NOW_PLAYING);
  const [movies, setMovies] = useState<MoviesType[]>([]);
  const [cart, setCart] = useState<MoviesType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);

  const [timer, setTimer] = useState<number>(5);

  useEffect(() => {
    const cached = getLocalStorage();
    let cachedCart: MoviesType[];
    let cachedMovieIds: number[];

    if (cached) {
      cachedCart = JSON.parse(cached);
      cachedMovieIds = cachedCart.map((item) => item.id);
      setCart(cachedCart);
    }

    try {
      const fetch = async () => {
        const res = await getMoviesByMode({ mode, page, search });
        const results: MoviesPopularApiType[] = Array.from(res.data.results);

        const totalPages: number = res.data.total_pages;

        setMovies(
          results.map((item) => {
            if (cached && cachedMovieIds.includes(item.id)) {
              const idx = cachedCart.findIndex((cart) => cart.id === item.id);
              return {
                id: item.id,
                title: item.title,
                vote: item.vote_average,
                releaseDate: item.release_date,
                image: item.poster_path,
                genres: item.genre_ids,
                price: cachedCart[idx].price
              };
            } else
              return {
                id: item.id,
                title: item.title,
                vote: item.vote_average,
                releaseDate: item.release_date,
                image: item.poster_path,
                genres: item.genre_ids,
                price: Math.ceil(Math.random() * 100)
              };
          })
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
    setSearch("");
  }, [mode]);

  useEffect(() => {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    let discount: number;
    if (cart.length >= 3 && cart.length < 5) discount = 0.1;
    else if (cart.length >= 5) discount = 0.2;
    else discount = 0;

    setTotal(totalPrice);
    setDiscount(discount);
  }, [cart]);

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
        total,
        setTotal,
        setCart,
        discount,
        setDiscount,
        page,
        setPage,
        pageCount,
        setPageCount,
        timer,
        setTimer
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
