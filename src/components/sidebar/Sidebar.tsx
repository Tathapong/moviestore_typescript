import { useState, useEffect } from "react";
import { getGenre } from "../../service/api";

import { Box, List, ListSubheader, ListItem, Chip, IconButton, Paper } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchInput from "../header/SearchInput";

interface GenreType {
  id: number;
  name: string;
}

interface SidebarProps {
  onClose: () => void;
}

function Sidebar({ onClose }: SidebarProps) {
  const [genres, setGenres] = useState<GenreType[]>([]);

  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await getGenre();
        const genreList = Array.from(res.data.genres);
        setGenres(genreList as GenreType[]);
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
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <Paper elevation={3} variant="outlined">
          <List
            subheader={
              <ListSubheader component={"div"} sx={{ backgroundColor: alpha("#0078D7", 0.5), color: "white" }}>
                Search
              </ListSubheader>
            }
          >
            <SearchInput />
          </List>
        </Paper>
        <Paper elevation={3} variant="outlined">
          <List
            subheader={
              <ListSubheader component={"div"} sx={{ backgroundColor: alpha("#0078D7", 0.5), color: "white" }}>
                Genre
              </ListSubheader>
            }
          >
            <ListItem>
              <Box display={"flex"} flexWrap={"wrap"} gap={1}>
                {genres.map((genre) => (
                  <Chip key={genre.id} label={genre.name} />
                ))}
              </Box>
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
}

export default Sidebar;
