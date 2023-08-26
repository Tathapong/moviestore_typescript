import { AppBar, Toolbar, Container, Box, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";

interface HeaderProps {
  sidebar: boolean;
  openSidebar: () => void;
}

function Header({ sidebar, openSidebar }: HeaderProps) {
  return (
    <AppBar position="static" sx={{ boxShadow: "none", backgroundColor: "#032541" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: "flex" }}>
          <Box display={sidebar ? "none" : "block"}>
            <IconButton onClick={openSidebar}>
              <ChevronRightIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          <Box>
            <IconButton>
              <HomeIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          <Box flexGrow={1} display={{ xs: "none", sm: "block" }} />
          <Box display={"flex"} alignItems={"center"}>
            <IconButton>
              <ShoppingCartIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
