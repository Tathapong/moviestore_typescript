import React from "react";
import { Box, Grid, Pagination } from "@mui/material";

import MovieCard from "./MovieCard";
import SearchInput from "../header/SearchInput";

import useAllContext from "../../contexts/useAllContext";
import { Mode } from "../../constants/mode";
import Checkout from "../checkout/Checkout";

function MovieSection() {
  const context = useAllContext();

  function onChangePagination(ev: React.ChangeEvent<unknown>, value: number) {
    context.setPage(value);
  }

  return (
    <Box py={2} px={10} overflow={"auto"} display={"flex"} flexDirection={"column"} gap={2}>
      {context.mode === Mode.SEARCH ? <SearchInput /> : ""}
      {context.mode === Mode.CHECKOUT ? (
        context.cart.length ? (
          <Checkout />
        ) : (
          ""
        )
      ) : (
        <>
          <Pagination
            count={context.pageCount}
            page={context.page}
            onChange={onChangePagination}
            color="primary"
            sx={{ alignSelf: "center" }}
          />

          <Grid container wrap="wrap" gap={4}>
            {context.movies.map((movie) => (
              <Grid key={movie.id} item maxWidth={"180px"} minWidth={"150px"}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}

export default MovieSection;
