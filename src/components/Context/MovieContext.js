import React, { createContext, useState, useContext } from 'react';


const MovieContext = createContext();


export const MovieProvider = ({ children }) => {
  const [movies, setMovies ] = useState();

  const updateMovie = (id, updatedRating, updatedReleaseDate) => {
    setMovies(movies.map(movie => movie.id === id ? { ...movie, vote_average: updatedRating, release_date: updatedReleaseDate } : movie));
  };

  return (
    <MovieContext.Provider value={{ movies, updateMovie, setMovies  }}>
      {children}
    </MovieContext.Provider>
    
  );
};

export const useMovies = () => useContext(MovieContext);
