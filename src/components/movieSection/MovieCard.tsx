import { Card, Paper, CardContent, CardActions, Typography, Box, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { MoviesType } from "../../interfaces/interface";

import useAllContext from "../../contexts/useAllContext";

interface MovieCardProps {
  movie: MoviesType;
}

const noImage =
  "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";

function MovieCard({ movie }: MovieCardProps) {
  const context = useAllContext();

  const isOnCart = context.cart.includes(movie.id);

  function onClickAddToCart() {
    const cloneCart = [...context.cart];
    const idx = cloneCart.indexOf(movie.id);

    if (idx !== -1) cloneCart.splice(idx, 1);
    else cloneCart.push(movie.id);

    context.setCart(cloneCart);
  }

  return (
    <Paper elevation={5} sx={{ height: "100%", position: "relative" }}>
      {isOnCart ? (
        <CheckIcon
          sx={{
            position: "absolute",
            left: -10,
            top: -10,
            backgroundColor: "white",
            color: "green",
            borderRadius: "50%",
            border: "4px solid #66bb6a"
          }}
          fontSize="large"
        />
      ) : (
        ""
      )}

      <Typography
        position={"absolute"}
        right={5}
        top={5}
        borderRadius={"10%"}
        width={35}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        component={"div"}
        fontWeight={900}
        fontSize={16}
        color="white"
        border="1px solid white"
        sx={{ backgroundColor: "rgb(211,47,47)" }}
      >
        {`$${movie.price}`}
      </Typography>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          border: isOnCart ? "4px solid #66bb6a" : "none"
        }}
      >
        <CardContent sx={{ flexGrow: 1, padding: 0, display: "flex", flexDirection: "column" }}>
          <Box
            flexGrow={1}
            component={"img"}
            src={movie.image ? "https://image.tmdb.org/t/p/w500" + movie.image : noImage}
          />

          <Box p={0.5} display={"flex"} height={"64px"} flexDirection={"column"} justifyContent={"space-between"}>
            <Box>
              <Typography fontSize={14} fontWeight={900}>
                {movie.title}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography fontSize={12} fontStyle={"italic"} color={"CaptionText"}>
                {movie.releaseDate.slice(0, 4)}
              </Typography>
              <Typography fontSize={12} fontWeight={900}>
                <Typography component={"span"} fontSize={14} fontWeight={900} color={"#4D8EC7"}>
                  {movie.vote}
                </Typography>
                /10
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions sx={{ p: 0.5, pb: 1 }}>
          <Button
            fullWidth
            variant="contained"
            color={isOnCart ? "error" : "primary"}
            size="small"
            onClick={onClickAddToCart}
          >
            {isOnCart ? "Remove from cart" : "Add to cart"}
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
}

export default MovieCard;
