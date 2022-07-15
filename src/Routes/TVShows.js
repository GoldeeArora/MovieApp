import React, { useState, useEffect } from "react";
import axios from "axios";
import Genre from "../Components/Genre";
import SingleComponent from "../Components/SingleComponents/SingleContent";
import CustomPagination from "../Components/Pagination/CustomPagination";
import useGenre from "../Hooks/useGenre";
function TVShows() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [noOfPages, setNoOfPages] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const genreforURL = useGenre(selectedGenre);
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNoOfPages(data.total_pages);
  };
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page,genreforURL]);
  return (
    <div>
      <span className="pageTitle">TVShows</span>
      <Genre
        type="tv"
        genres={genre}
        setGenre={setGenre}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        setPage={setPage}
      />
      <div className="Movies">
        {content &&
          content.map((c) => (
            <SingleComponent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} noOfPages={noOfPages} />
    </div>
  );
}

export default TVShows;
