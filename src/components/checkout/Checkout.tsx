import { useState } from "react";
import { Box, Grid, Typography, IconButton, Container, List, ListItem, Button, Modal } from "@mui/material";
import { Mode } from "../../constants/mode";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Payment from "./Payment";

import useAllContext from "../../contexts/useAllContext";
import { setLocalStorage } from "../../utilities/localStorage";

const noImage =
  "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";

function Checkout() {
  const [openPayment, setOpenPayment] = useState(false);
  const [paymentStart, setPaymentStart] = useState<number>(0);
  const [paymentStop, setPaymentStop] = useState<number>(0);

  const context = useAllContext();

  function onClickRemoveFromCart(id: number) {
    const cloneCart = [...context.cart];
    const idx = cloneCart.findIndex((item) => item.id === id);

    if (idx !== -1) {
      cloneCart.splice(idx, 1);
      context.setCart(cloneCart);
    }

    setLocalStorage(cloneCart);
  }

  function onClickGotoShop() {
    context.setMode(Mode.NOW_PLAYING);
  }

  function onClickCheckout() {
    setOpenPayment(true);
    setPaymentStart(new Date().getTime());
    setPaymentStop(new Date().getTime());
  }

  function onClosePayment() {
    setOpenPayment(false);
    setPaymentStart(0);
    setPaymentStop(0);
  }

  return (
    <Container maxWidth={"md"}>
      <Box bgcolor={"gainsboro"} p={4}>
        <List disablePadding>
          {context.cart.map((cart) => (
            <ListItem key={cart.id} divider sx={{ py: 2, px: 0 }}>
              <Grid container wrap="nowrap" height={"200px"}>
                <Grid xs item display={"flex"} justifyContent={"center"} alignItems={"center"}>
                  <Box
                    component={"img"}
                    src={cart.image ? "https://image.tmdb.org/t/p/w500" + cart.image : noImage}
                    height={"100%"}
                    borderRadius={"4%"}
                  />
                </Grid>
                <Grid item xs display={"flex"} alignItems={"center"}>
                  <Typography fontSize={14} fontWeight={900} textOverflow={"ellipsis"} whiteSpace={"normal"}>
                    {cart.title}
                  </Typography>
                </Grid>
                <Grid item xs display={"flex"} justifyContent={"center"} alignItems={"center"}>
                  <Typography fontSize={14} fontWeight={900} color={"Highlight"}>{`$${cart.price.toFixed(
                    2
                  )}`}</Typography>
                </Grid>
                <Grid item xs display={"flex"} justifyContent={"center"} alignItems={"center"}>
                  <IconButton size="medium" onClick={() => onClickRemoveFromCart(cart.id)}>
                    <RemoveCircleIcon fontSize="medium" color="error" />
                  </IconButton>
                </Grid>
              </Grid>
            </ListItem>
          ))}
          <ListItem sx={{ pt: 1, px: 0 }}>
            <Grid container wrap="nowrap" bgcolor={"Highlight"} p={1} borderRadius={2}>
              <Grid item xs></Grid>
              <Grid item xs display={"flex"} alignItems={"center"}>
                <Box display={"flex"} flexDirection={"column"}>
                  <Typography color={"white"} fontSize={"16px"} fontWeight={900}>
                    Total
                  </Typography>
                  {context.discount ? (
                    <Typography component={"span"} fontSize={"14px"} color={"white"}>
                      {`(discount ${context.discount * 100}%)`}
                    </Typography>
                  ) : (
                    ""
                  )}
                </Box>
              </Grid>
              <Grid item xs display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                  <Typography color={"white"} fontSize={"16px"} fontWeight={900}>{`$${(
                    context.total *
                    (1 - context.discount)
                  ).toFixed(2)}`}</Typography>
                  {context.discount ? (
                    <Typography
                      fontSize={"14px"}
                      color={"white"}
                      sx={{ textDecoration: "line-through" }}
                    >{`$${context.total.toFixed(2)}`}</Typography>
                  ) : (
                    ""
                  )}
                </Box>
              </Grid>
              <Grid item xs></Grid>
            </Grid>
          </ListItem>
        </List>
      </Box>
      <Box display={"flex"} justifyContent={"space-around"} p={2}>
        <Button variant="contained" onClick={onClickGotoShop}>
          Continue Shopping
        </Button>
        <Button variant="contained" color="success" onClick={onClickCheckout}>
          Checkout Now
        </Button>
      </Box>
      <Modal open={openPayment} onClose={onClosePayment}>
        <Payment paymentStart={paymentStart} paymentStop={paymentStop} />
      </Modal>
    </Container>
  );
}

export default Checkout;
