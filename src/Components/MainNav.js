import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";
import "./MainNav.css";
import { Navigate, useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const Navigate = useNavigate();
  useEffect(() => {
    if (value === 0) Navigate("../", { replace: "true" });
    else if (value === 1) Navigate("../movies", { replace: "true" });
    else if (value === 2) Navigate("../tvshows", { replace: "true" });
    else if (value === 3) Navigate("../search", { replace: "true" });
  }, [value, Navigate]);
  return (
    <Box className="box">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Movies"
          icon={<MovieCreationIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="TVShows"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
