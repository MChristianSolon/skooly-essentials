import React, { useContext } from 'react';
import LecturesLogo from '../../images/Lectures.png';

function Gallery({ publisher, url }) {
  return (
    <div style={{ height: '16vh', marginBottom: '5vh' }}>
      <h1>{`${publisher}: ${url}`}</h1>
    </div>
  );
}

export default Gallery;
