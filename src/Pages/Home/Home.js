import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Home.css";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { useMovies } from "../../components/Context/MovieContext";

const Home = () => {
  const API_KEY = "c39d0a777ae4bb9508b6045b6d64c049";

  const [page, setPage] = useState(1);
  const { movies, setMovies } = useMovies();
  const [sortOrder, setSortOrder] = useState("ascending");
  

  const fetchHome = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
    );
    setMovies(data.results);
  };

  const toggleSortOrder = () => {
    if (sortOrder === "ascending") {
      const sortedMovies = [...movies].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      setMovies(sortedMovies);
      setSortOrder("descending");
    } else {
      const sortedMovies = [...movies].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setMovies(sortedMovies);
      setSortOrder("ascending");
    }
  };
  useEffect(() => {
    // eslint-disable-next-line 
    fetchHome();
  }, [page]);

  return (
    <div>
      <span className="pagetitle">
        Home
        <button className="sortbutton" onClick={toggleSortOrder}>
          Sort {sortOrder === "ascending" ? "Descending" : "Ascending"}
        </button>
      </span>

      <div className="home">
        {movies &&
          movies.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title}
              date={c.release_date}
              overview={c.overview}
              // vote = {c.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Home;
