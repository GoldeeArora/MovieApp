import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./Search.css";
import axios from "axios";
import CustomPagination from "../Components/Pagination/CustomPagination";
import SingleContent from "../Components/SingleComponents/SingleContent";
import "./Trending.css";
function Search() {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [noOfPages, setNoOfPages] = useState(0);
  const [page, setPage] = useState(1);
  const [condition, setCondition] = useState(1);
  const darktheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  const fetchSearch = async () => {
    // e.preventDefault();

    const { data } = await axios.get(
      ` https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      // console.log(data.results);
    );
    setContent(data.results);
    setNoOfPages(data.total_pages);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [page, type]);
  return (
    <div>
      <ThemeProvider theme={darktheme}>
        <form>
          <div style={{ display: "flex", margin: "15px 0" }}>
            <TextField
              style={{ flex: 1 }}
              className="searchbox"
              label="Search"
              variant="filled"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <Button
              variant="contained"
              style={{ marginLeft: 10 }}
              type="submit"
              disabled={searchText.length === 0}
              onClick={(e) => {
                e.preventDefault();
                fetchSearch();
                setCondition(0);
              }}
            >
              <SearchIcon />
            </Button>
          </div>
        </form>

        <Tabs value={type} indicatorColor="primary" textColor="primary">
          <Tab
            label="Search Movies"
            style={{ width: "50%" }}
            onClick={() => {
              setType(0);
              setPage(1);
            }}
          />
          <Tab
            label="Search Series"
            style={{ width: "50%" }}
            onClick={() => {
              setType(1);
              setPage(1);
            }}
          />
        </Tabs>
      </ThemeProvider>

      <div className="trending">
        {content &&
          content.map((c) => {
            return (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={c.vote_average}
              />
            );
          })}
        {content.length === 0 &&
          !condition &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {noOfPages > 1 && (
        <CustomPagination setPage={setPage} noOfPages={noOfPages} />
      )}
    </div>
  );
}

export default Search;
