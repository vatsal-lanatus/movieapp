import { Button } from '@mui/base';
import { TextField } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import './Search.css';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';


const Search = () => {
  const API_KEY = 'c39d0a777ae4bb9508b6045b6d64c049'

  
  const [searchText, setSearchText] = useState('');
  const [content, setContent] = useState();
  const [numOfPages, setnumOfPages] = useState()
  const [page , setPage] = useState(1);
  
  



  const fetchSearch = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=${API_KEY}&page=${page}`);

    setContent(data.results);
    setnumOfPages(data.total_pages);
    console.log(data);

  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [page])

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#0000FF",
      },
    },
  });



  return (

    <div>

      <ThemeProvider theme={darkTheme}>
      <div className='search'>

      <TextField
        style={{ flex: 1 }}
        className='searchbox'
        label='Search'
        variant='filled'
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button variant='contained' style={{ marginLeft: 10  }} onClick={fetchSearch} >
        <SearchIcon />
      </Button>
      </div>
      </ThemeProvider>

      

      <div className="home">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title}
              date={c.release_date}
              
              vote_average={c.vote_average}
            />
          ))}
        {(searchText &&
          !content.length) &&
          <h2 style={{color : 'coral', fontSize:'50px'}}> No Movies Found 😬 </h2>}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search




