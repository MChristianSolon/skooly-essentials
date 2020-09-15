import React from 'react';
import { useParams } from 'react-router-dom';
import JumboTron from './JumboTron';
import Grid from '@material-ui/core/Grid';
import Log from './Log/Log';
import Comments from './Comments/Comments';
import RelatedLink from './RelatedLink/RelatedLink';

import './Stage.css';

function Stage() {
  let { user, url } = useParams();

  return (
    <div>
      <Grid container>
        <Grid item xs={7}>
          <JumboTron url={url} publisher={user} />
        </Grid>
        <Grid item xs={5}>
          <Log url={url} />
        </Grid>
        <Grid item xs={7}>
          <RelatedLink />
        </Grid>
        <Grid item xs={5}>
          <Comments url={url} publisher={user} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Stage;
