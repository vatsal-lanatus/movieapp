import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { img_300, unavailable  } from '../components/Config/Config';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './ContentModal.css';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '80%',
  bgcolor: '#DDCEC8',
  borderRadius: 10,
  border: '1px solid #282c34',
  boxShadow: 5,
  p: 4,

};

export default function ContentModal({ children , id }) {

  const API_KEY = 'c39d0a777ae4bb9508b6045b6d64c049';
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  
  const fetchData = async () => {
    
    
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    );
    
    setContent(data);
  };


  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`

    );

    setVideo(data.results[0]?.key)

  };

  useEffect(() => {
    fetchData()
    fetchVideo()
    // eslint-disable-next-line
  }, [])





  return (
    <div>
      <div className="media" onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          {content && (
            <Box sx={style}>
              <div className='ContentModal'>
                <img alt={content.title}
                className='ContentModal_portrait'
                src={content.poster_path ? `${img_300}/${content.poster_path}` : unavailable}
                />
                <img alt={content.title}
                className='ContentModal_landscape'
                src={content.backdrop_path ? `${img_300}/${content.backdrop_path}` : unavailable}
                />
                <div className='ContentModal_about'>
                  <span className='ContentModal_title'>
                    {content.title}(
                      {(
                        content.release_date || '_____'
                      ).substring(0,4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className='tagline'>{content.tagline}</i>
                  )}
                  <span className='ContentModal_description'>
                    {content.overview}
                  </span>
                  <div>

                  </div>
                  <Button
                    variant='contained'
                    startIcon= {<YouTubeIcon/>}
                    color='secondary'
                    target='__blank'
                    href= {`https://www.youtube.com/watch?v=${video}`}>
                      Watch Trailer
                    </Button>

                </div>
              </div>  
            </Box>
          )}
        </Fade>
      </Modal>
    </div>
  );
}