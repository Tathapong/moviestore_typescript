import { useEffect } from "react";
import { Paper, Box } from "@mui/material";
import MovieCard from "./MovieCard";
import useAllContext from "../../contexts/useAllContext";

function MovieSection() {
  const context = useAllContext();
  return (
    <Paper elevation={3} variant="elevation" sx={{ backgroundColor: "salmon" }}>
      {context.movies.map((item) => (
        <MovieCard title={item.title} vote={item.vote_average} release_date={item.release_date} />
      ))}
    </Paper>
  );
}

export default MovieSection;
