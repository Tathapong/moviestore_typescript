import { useState, useEffect } from "react";
import { getGenre } from "../../service/api";

import { Box, List, ListSubheader, ListItem, Chip, IconButton, Paper, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useAllContext from "../../contexts/useAllContext";

import SearchInput from "../header/SearchInput";

interface GenreType {
  id: number;
  name: string;
}

interface SidebarProps {
  onClose: () => void;
}

function Sidebar({ onClose }: SidebarProps) {
  const context = useAllContext();

  const [search, setSearch] = useState<string>("");
  const [genres, setGenres] = useState<number[]>([]);
  const [genreList, setGenreList] = useState<GenreType[]>([]);

  function onClickGenreChip(id: number) {
    // const cloneGenres = [...genres];
    // const idx = genres.findIndex((item) => item === id);
    // if (idx !== -1) cloneGenres.splice(idx, 1);
    // else cloneGenres.push(id);
    // setGenres(cloneGenres);

    const cloneGenre = [...context.genre];
    const idx = context.genre.findIndex((item) => item === id);
    if (idx !== -1) cloneGenre.splice(idx, 1);
    else cloneGenre.push(id);
    context.setGenre(cloneGenre);
  }

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await getGenre();
        const genreList = Array.from(res.data.genres);
        setGenreList(genreList as GenreType[]);
      };
      fetch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <Box height={"100%"} p={1} sx={{ backgroundColor: alpha("#032541", 0.7) }}>
      <Box height={"56px"} display={"flex"} justifyContent={"flex-end"} mb={2}>
        <IconButton size="small" onClick={onClose}>
          <ChevronLeftIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Box display={"flex"} flexDirection={"column"} gap={2} mb={3}>
        <Paper elevation={3}>
          <List
            subheader={
              <ListSubheader component={"div"} sx={{ backgroundColor: alpha("#0078D7", 0.5), color: "white" }}>
                Search
              </ListSubheader>
            }
          >
            <SearchInput search={search} setSearch={setSearch} />
          </List>
        </Paper>
        <Paper elevation={3}>
          <List
            subheader={
              <ListSubheader component={"div"} sx={{ backgroundColor: alpha("#0078D7", 0.5), color: "white" }}>
                Genre
              </ListSubheader>
            }
          >
            <ListItem>
              <Box display={"flex"} flexWrap={"wrap"} gap={1}>
                {genreList.map((genre) => (
                  <Chip
                    key={genre.id}
                    variant={context.genre.includes(genre.id) ? "filled" : "outlined"}
                    color="success"
                    label={genre.name}
                    onClick={() => onClickGenreChip(genre.id)}
                  />
                ))}
              </Box>
            </ListItem>
          </List>
        </Paper>
      </Box>

      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <Button variant="contained" color="success">
          Search
        </Button>
      </Box>
    </Box>
  );
}

export default Sidebar;
