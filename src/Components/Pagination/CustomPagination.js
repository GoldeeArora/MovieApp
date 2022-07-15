import * as React from "react";
import Pagination from "@mui/material/Pagination";
import "./CustomPagination.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { ThemeProvider } from "@emotion/react";
export default function CustomPagination({ setPage, noOfPages = 10 }) {
  function handleChange(page) {
    setPage(page);
    window.scroll(0, 0);
  }
  const darktheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  return (
    <div className="container">
      <ThemeProvider theme={darktheme}>
        <Pagination
          count={noOfPages}
          onChange={(e) => {
            handleChange(e.target.textContent);
          }}
          color="primary"
          hidePrevButton
          hideNextButton
        />
      </ThemeProvider>
    </div>
  );
}
