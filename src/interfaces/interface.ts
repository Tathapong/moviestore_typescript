import React from "react";

export type SetStateType<type = boolean> = React.Dispatch<React.SetStateAction<type>>;

export interface ChildrenPropsType {
  children: React.ReactNode;
}

export interface MoviesType {
  id: number;
  title: string;
  vote: number;
  releaseDate: string;
  image: string;
  genres: number[];
  price: number;
}

export interface MoviesPopularApiType {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
}
