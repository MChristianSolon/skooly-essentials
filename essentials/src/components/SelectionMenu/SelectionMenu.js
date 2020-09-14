import React from 'react';
import Gallery from './Gallery';
import LineGallery from './LineGallery';
import ComputerMan from '../../images/ComputerMan.png';
import './SelectionMenu.css';
import Heart from '../../images/Heart.png';

function SelectionMenu() {
  return (
    <div className="SelectionMenu">
      <div style={{ marginTop: '6vh', textAlign: 'center' }}>
        <div style={{ backgroundColor: 'white', width: '100%' }}>
          <img
            src={ComputerMan}
            alt="ComputerMan"
            style={{ width: '80vh', position: 'relative', left: '35vw' }}
          />
          <img
            src={Heart}
            alt="Heart"
            style={{
              width: '600px',
              position: 'relative',
              right: '45vw',
              bottom: '4vh',
            }}
          />
        </div>

        <div style={{ height: '500px', backgroundColor: '#F8E9A1' }}></div>
        <LineGallery />
      </div>
    </div>
  );
}

export default SelectionMenu;
