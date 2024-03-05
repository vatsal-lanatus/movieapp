import React, { useState, useEffect } from "react";
import { useMovies } from "../../components/Context/MovieContext";
import { DataGrid } from "@mui/x-data-grid";
import "./Edit.css";

const MovieList = () => {
  const { movies, updateMovie } = useMovies();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const formattedMovies = movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      rating: movie.vote_average,
      releaseDate: movie.release_date,
    }));
    setRows(formattedMovies);
  }, [movies]);

  const handleProcessRowUpdate = async (newRow) => {
    await updateMovie(newRow.id, newRow.rating, newRow.releaseDate);
    return newRow;
  };

  const columns = [
    { field: "title", headerName: "Title", width: 200, editable: false ,flex :1 },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      width: 130,
      editable: true,
      
    },
    {
      field: "releaseDate",
      headerName: "Release Date",
      type: "date",
      valueFormatter: ({ value }) => new Date(value).toDateString(),
      width: 180,
      editable: true,
    },
  ];

  return (
    <div style={{ height: 600, width: "100%", backgroundColor: "white" }}>
      <DataGrid
        sx={{ color: "black", fontWeight: "bold" }}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        processRowUpdate={handleProcessRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
};

export default MovieList;
