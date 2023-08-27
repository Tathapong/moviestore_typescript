import { AppBar, Toolbar, Box, IconButton, Button, Badge, Menu, MenuItem } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartMenu from "./CartMenu";

import { Mode, ModeType } from "../../constants/mode";
import useAllContext from "../../contexts/useAllContext";

const modes: ModeType[] = [Mode.NOW_PLAYING, Mode.POPULAR, Mode.TOP_RATED, Mode.UPCOMING, Mode.SEARCH, Mode.CHECKOUT];

function Header() {
  const context = useAllContext();

  function onClickMenu(mode: ModeType) {
    context.setMode(mode);
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
          <IconButton>
            <Badge badgeContent={context.cart.length} color="error">
              <ShoppingCartIcon sx={{ color: "white" }} />
            </Badge>
          </IconButton>

          {/* <Menu open>
            <MenuItem>
              <CartMenu />
            </MenuItem>
          </Menu> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
