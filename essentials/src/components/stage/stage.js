import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JumboTron from './JumboTron';
import Grid from '@material-ui/core/Grid';
import Log from './Log/Log';
import Comments from './Comments/Comments';
import RelatedLink from './RelatedLink/RelatedLink';
import { db } from '../../Firebase/Firebase';

import './Stage.css';

function Stage() {
  let { user, url } = useParams();
  let [code, setCode] = useState('');
  db.collection('videos').onSnapshot((snap) => {
    snap.docs.forEach((doc) => {
      if ((doc.data().publisher = user) && doc.data().videoUrl == url) {
        setCode(doc.data().code);
      }
    });
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'right' }}>
        code: <b>{code}</b>
      </h2>
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
