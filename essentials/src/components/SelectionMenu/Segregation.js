import React from 'react';
import LineGallery from './LineGallery';
import Grid from '@material-ui/core/Grid';
import FunctionsIcon from '@material-ui/icons/Functions';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import './Segregation.css';

function Segregation() {
  return (
    <Grid container className="segregation">
      <h1 id="math">
        <FunctionsIcon id="subject-icon" />
        Math
      </h1>
      <Grid item md={12} className="math-grid">
        <LineGallery />
      </Grid>

      <h1 id="science">
        <WhatshotIcon id="subject-icon" />
        Science
      </h1>
      <Grid item md={12} className="science-grid">
        <LineGallery />
      </Grid>

      <h1 id="history">
        <ImportContactsIcon id="subject-icon" />
        History
      </h1>
      <Grid item md={12} className="history-grid">
        <LineGallery />
      </Grid>
    </Grid>
  );
}

export default Segregation;
