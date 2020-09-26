import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JumboTron from './JumboTron';
import Grid from '@material-ui/core/Grid';
import Log from './Log/Log';
import Comments from './Comments/Comments';
import RelatedLink from './RelatedLink/RelatedLink';
import TextField from '@material-ui/core/TextField';
import { db } from '../../Firebase/Firebase';
import './Stage.css';

function Stage() {
  let { user, url } = useParams();
  let [code, setCode] = useState('');
  let [datePublish, setDatePubish] = useState('');
  let [relatedLink, setRelatedLink] = useState('');
  let [pageId, setPageId] = useState('');

  db.collection('videos').onSnapshot((snap) => {
    snap.docs.forEach((doc) => {
      if ((doc.data().publisher = user) && doc.data().videoUrl === url) {
        setCode(doc.data().code);
        setPageId(doc.id);
      }
    });
  });

  useEffect(() => {
    db.collection('videos')
      .get()
      .then((snap) => {
        snap.docs.forEach((doc) => {
          if ((doc.data().publisher = user) && doc.data().videoUrl === url) {
            setDatePubish(doc.data());
          }
        });
      });

    window.scrollTo(0, 0);
  }, []);

  function handleChange(event) {
    setRelatedLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    db.collection(`videos`)
      .doc(pageId)
      .update({
        relatedLink,
      })
      .then(() => {
        setRelatedLink('');
      });
  }
  return (
    <div>
      <h2 style={{ textAlign: 'right' }}>
        code: <b>{code}</b>
      </h2>
      <Grid container>
        <Grid item xs={7}>
          <JumboTron url={url} publisher={user} datePublish={datePublish} />
        </Grid>
        <Grid item xs={5}>
          <Log url={url} />
        </Grid>
        <Grid item xs={7}>
          <form onSubmit={handleSubmit}>
            <TextField
              style={{ width: '100%' }}
              label="Enter A Shared Google Docs Link Here!"
              value={relatedLink}
              onChange={handleChange}
            />
          </form>
          <RelatedLink pageId={pageId} />
        </Grid>
        <Grid item xs={5}>
          <Comments url={url} publisher={user} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Stage;
