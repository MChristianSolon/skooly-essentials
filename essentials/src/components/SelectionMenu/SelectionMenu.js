import React from 'react';
import Gallery from './Gallery';
import LineGallery from './LineGallery';
import './SelectionMenu.css';

function SelectionMenu() {
  return (
    <div className="selectionMenu">
      <div style={{ marginTop: '8vh' }}>
        {/* <Gallery /> */}
        <LineGallery />
      </div>
    </div>
  );
}

export default SelectionMenu;
