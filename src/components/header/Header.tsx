import React from "react";

import { AppBar, Toolbar, Box, IconButton, Button, Badge, Menu, Typography, List, ListItem } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartMenu from "../cart/CartMenu";

import { Mode, ModeType } from "../../constants/mode";
import useAllContext from "../../contexts/useAllContext";
import { setLocalStorage } from "../../utilities/localStorage";

const modes: ModeType[] = [Mode.NOW_PLAYING, Mode.POPULAR, Mode.TOP_RATED, Mode.UPCOMING, Mode.SEARCH, Mode.CHECKOUT];

function Header() {
  const context = useAllContext();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function onCloseCart() {
    setAnchorEl(null);
  }

  function onClickCart(ev: React.MouseEvent<HTMLButtonElement>) {
    if (context.cart.length > 0) setAnchorEl(ev.currentTarget);
  }

  function onClickClearCart() {
    setAnchorEl(null);
    context.setCart([]);
    setLocalStorage([]);
  }

  function onClickMenu(mode: ModeType) {
    context.setMode(mode);
  }

  function onClickCheckout() {
    setAnchorEl(null);
    context.setMode(Mode.CHECKOUT);
  }

  return (
    <AppBar position="sticky" sx={{ boxShadow: "none", backgroundColor: "#032541", px: 8 }}>
      <Toolbar disableGutters sx={{ display: "flex" }}>
        <Box display={"flex"} gap={2}>
          {modes.map((mode, index) => (
            <Button
              key={index}
              size="small"
              variant="text"
              color={context.mode === mode ? "warning" : "info"}
              onClick={() => onClickMenu(mode)}
            >
              {mode}
            </Button>
          ))}
        </Box>
        <Box flexGrow={1} display={{ xs: "none", sm: "block" }} />
        <Box display={"flex"} alignItems={"center"}>
          <Badge badgeContent={context.cart.length} color="error">
            <IconButton
              id="cart-button"
              aria-controls={open ? "cart-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={onClickCart}
            >
              <ShoppingCartIcon sx={{ color: "white" }} />
            </IconButton>
          </Badge>
        </Box>
        <Menu
          id="cart-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={onCloseCart}
          MenuListProps={{ "aria-labelledby": "cart-button" }}
        >
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button variant="text" color="error" size="small" sx={{ p: 0 }} onClick={onClickClearCart}>
              <Typography fontSize={"11px"}>Clear</Typography>
            </Button>
          </Box>

          <List disablePadding>
            {context.cart.map((item) => (
              <ListItem key={item.id} divider sx={{ px: 1, py: 0.5 }}>
                <CartMenu cart={item} />
              </ListItem>
            ))}

            <Box display={"flex"} width={"100%"} justifyContent={"space-between"} p={1}>
              <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
                <Typography color={"Highlight"} fontSize={"13px"} fontWeight={900}>
                  Total{" "}
                </Typography>
                {context.discount ? (
                  <Typography component={"span"} fontSize={"12px"} color={"red"}>
                    {`(discount ${context.discount * 100}%)`}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"flex-end"}>
                <Typography color={"Highlight"} fontSize={"13px"} fontWeight={900}>{`$${(
                  context.total *
                  (1 - context.discount)
                ).toFixed(2)}`}</Typography>
                {context.discount ? (
                  <Typography fontSize={"12px"} sx={{ textDecoration: "line-through" }}>{`$${context.total.toFixed(
                    2
                  )}`}</Typography>
                ) : (
                  ""
                )}
              </Box>
            </Box>

            <ListItem sx={{ px: 1, py: 0.5 }}>
              <Button fullWidth variant="contained" size="medium" onClick={onClickCheckout}>
                Checkout
              </Button>
            </ListItem>
          </List>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
