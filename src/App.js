import "./App.css";
import Header from "./Components/Header";
import MainNav from "./Components/MainNav";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movies from "./Routes/Movies";
import Trending from "./Routes/Trending";
import TVShows from "./Routes/TVShows";
import Search from "./Routes/Search";
function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvshows" element={<TVShows />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>
      <MainNav />
    </Router>
  );
}

export default App;
