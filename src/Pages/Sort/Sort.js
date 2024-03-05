import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';

import './Sort.css';


const Sort = () => {
  const [movies, setMovies] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const API_KEY = 'c39d0a777ae4bb9508b6045b6d64c049';

  const [page, setPage] = useState(1);


  const fetchMoviesAscending = async () => {

    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&primary_release_year=2020&sort_by=original_title.asc`
    );

    setMovies(data.results);
    console.log({ data })

  };
  const fetchMoviesDescending = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&primary_release_year=2020&page=1&sort_by=original_title.decs`);

    setMovies(data.results);
    console.log({ data })


  };


  useEffect(() => {

    fetchMoviesAscending();
    // eslint-disable-next-line
  }, [page]);


  const toggleSortOrder = () => {
    if (isAscending) {
      fetchMoviesDescending();
    } else {
      fetchMoviesAscending();
    }
    setIsAscending(!isAscending);
  };

  const printMessage = () => {
    if(!isAscending){
     console.log ('sorted in Ascending')
    }else {
      console.log('Sorted in Descending')
    }
  };

  function myFunction() {
    toggleSortOrder()
    printMessage()
  };


  return (
    <div>
      <span className='pagetitle'> Sort 
        <button className='sortbutton' onClick={myFunction}>Sort</button>
      </span>
     
      <div className='home' >
        {movies.length > 0 ? (
            movies.map((movie) => (
              <SingleContent key={movie.id} 
              id={movie.id} 
              title={movie.title}
              poster={movie.poster_path}
              date={movie.release_date} />
            ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};





export default Sort;