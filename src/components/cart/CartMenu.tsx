import { Box, Typography, IconButton, Grid } from "@mui/material";
import { MoviesType } from "../../interfaces/interface";

import DeleteIcon from "@mui/icons-material/Delete";
import useAllContext from "../../contexts/useAllContext";
import { setLocalStorage } from "../../utilities/localStorage";

const noImage =
  "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";

interface CartMenuProps {
  cart: MoviesType;
}

function CartMenu({ cart }: CartMenuProps) {
  const context = useAllContext();

  function onClickRemoveFromCart() {
    const cloneCart = [...context.cart];
    const idx = cloneCart.findIndex((item) => item.id === cart.id);

    if (idx !== -1) {
      cloneCart.splice(idx, 1);
      context.setCart(cloneCart);
    }

    setLocalStorage(cloneCart);
  }

  return (
    <Grid container columns={10} wrap="nowrap" height={"60px"} minWidth={"250px"}>
      <Grid xs={2} item>
        <Box
          component={"img"}
          src={cart.image ? "https://image.tmdb.org/t/p/w500" + cart.image : noImage}
          height={"100%"}
        />
      </Grid>
      <Grid item xs={8} display={"flex"} justifyContent={"space-between"}>
        <Box overflow={"hidden"} display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
          <Typography fontSize={12} fontWeight={900} textOverflow={"ellipsis"} whiteSpace={"normal"}>
            {cart.title}
          </Typography>
          <Typography fontSize={12}>{`$${cart.price.toFixed(2)}`}</Typography>
        </Box>

        <Box alignSelf={"center"}>
          <IconButton size="small" onClick={onClickRemoveFromCart}>
            <DeleteIcon fontSize="small" color="error" />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CartMenu;
