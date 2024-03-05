import React from 'react'
import ContentModal from '../../ContentModal/ContentModal';
import { img_300 , unavailable } from '../Config/Config'
import './SingleContent.css';

// import { Badge } from '@mui/material';

const SingleContent = ({id,poster , title, date,overview , vote}) => {
  return (
    <ContentModal id = {id} >
        <img className='poster' src={poster ? `${img_300}/${poster}`: unavailable} alt={title}/>
        <b className='title'>{title}</b>
        <span className='subtitle'>{new Date(date).toLocaleDateString()}</span>
    </ContentModal>
  )
}

export default SingleContent