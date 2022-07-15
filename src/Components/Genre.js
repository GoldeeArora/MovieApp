import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import axios from "axios";
import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
function Genre({
  type,
  genres,
  setGenre,
  selectedGenre,
  setSelectedGenre,
  setPage,
}) {

  const darktheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
  });
  const handleAdd = (genre) => {
    setSelectedGenre([...selectedGenre, genre]);
    setGenre(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove = (genre) => {
    setSelectedGenre(selectedGenre.filter((g) => g.id !== genre.id));
    setGenre([...genres, genre]);
    setPage(1);
  };
  const deleteAll = () => {
    setGenre(genres.concat(selectedGenre));
    setSelectedGenre([]);
    setPage(1);
  };
  const fetchGenre = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      // eslint-disable-next-line
    );
    setGenre(data.genres);
  };
  useEffect(() => {
    fetchGenre();
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ padding: "5px 0" }}>
      <ThemeProvider theme={darktheme}>
        {selectedGenre.length !== 0 ? (
          <Chip
            style={{ margin: 2 }}
            color="error"
            label="Deselect all"
            size="small"
            clickable
            deleteIcon={<DeleteIcon />}
            onDelete={() => deleteAll()}
          />
        ) : (
          ""
        )}
        {selectedGenre.map((genre) => (
          <Chip
            style={{ margin: 2 }}
            color="primary"
            label={genre.name}
            size="small"
            clickable
            onDelete={() => handleRemove(genre)}
          />
        ))}
        {genres.map((genre) => {
          return (
            <Chip
              label={genre.name}
              style={{ margin: 2 }}
              size="small"
              clickable
              onClick={() => handleAdd(genre)}
            />
          );
          // console.log("hello")
        })}
      </ThemeProvider>
    </div>
  );
}

export default Genre;
