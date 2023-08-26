import { createContext, useState, useEffect } from "react";
import { ChildrenPropsType } from "../interfaces/interface";
import { getPopularMovies } from "../service/api";
import { SetStateType } from "../interfaces/interface";

interface ContextPropsType {
  movies: unknown[];
  setMovies: SetStateType<unknown[]>;
}

export const Context = createContext<ContextPropsType | null>(null);

function ContextProvider({ children }: ChildrenPropsType) {
  const [movies, setMovies] = useState<unknown[]>([]);

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await getPopularMovies();
        const results = res.data.results;
        console.log(results);
        setMovies(results);
      };
      fetch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <Context.Provider value={{ movies, setMovies }}>{children}</Context.Provider>;
}

export default ContextProvider;
