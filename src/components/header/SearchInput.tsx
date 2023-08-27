import React from "react";

import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import useAllContext from "../../contexts/useAllContext";

const Search = styled("div")(({ theme }) => ({
  marginBlock: 10,
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    border: "2px solid #7C3AED"
  },
  marginLeft: 0,

  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto"
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.mode === "dark" ? "white" : "#475569"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

export default function SearchInput() {
  const context = useAllContext();

  function onChangeInput(ev: React.ChangeEvent<HTMLInputElement>) {
    context.setSearch(ev.target.value);
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onChange={onChangeInput}
        value={context.search}
      />
    </Search>
  );
}
