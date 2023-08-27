import { CssBaseline, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Header from "./components/header/Header";
import MovieSection from "./components/movieSection/MovieSection";

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid container wrap="nowrap">
        <Grid item xs height={"100vh"} display={"flex"} flexDirection={"column"}>
          <Header />
          <MovieSection />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
