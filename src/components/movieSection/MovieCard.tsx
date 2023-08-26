import React from "react";
import { Card, CardHeader, CardContent, CardActions, Typography, Box, Button } from "@mui/material";

interface MovieCardProps {
  title: string;
  vote: number;
  release_date: string;
}

function MovieCard({ title, vote, release_date }: MovieCardProps) {
  return (
    <Card>
      <CardContent>
        <img src={"https://image.tmdb.org/t/p/w600_and_h900_bestv2/1eHMicYRA0BBnWUyXofyDCMnVJv.jpg"} />
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography>{title}</Typography>
          <Typography>{`${vote}/10`}</Typography>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography>{release_date.slice(0, 4)}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button>Add to cart</Button>
      </CardActions>
    </Card>
  );
}

export default MovieCard;
