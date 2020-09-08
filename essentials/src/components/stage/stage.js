import React from 'react';
import { useParams } from 'react-router-dom';
import JumboTron from './JumboTron';
import Grid from '@material-ui/core/Grid';
import Log from './Log/Log';
import './Stage.css';

function Stage() {
  let { user, url } = useParams();
  console.log(user, url);
  return (
    <div>
      <Grid container>
        <Grid item xs={7}>
          <JumboTron url={url} />
        </Grid>
        <Grid item xs={5}>
          <Log currentUser={user} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Stage;
