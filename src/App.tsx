import { useState } from "react";

import { CssBaseline, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import MovieSection from "./components/movieSection/MovieSection";

function App() {
  const [sidebar, setSidebar] = useState<boolean>(true);

  function closeSidebar() {
    setSidebar(false);
  }

  function openSidebar() {
    setSidebar(true);
  }

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid container>
        <Grid item display={sidebar ? "block" : "none"} maxWidth={"270px"} height={"100vh"}>
          <Sidebar onClose={closeSidebar} />
        </Grid>
        <Grid item xs height={"100vh"} display={"flex"} flexDirection={"column"}>
          <Header openSidebar={openSidebar} sidebar={sidebar} />
          <MovieSection />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
