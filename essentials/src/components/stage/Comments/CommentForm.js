import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { db, timestamp } from '../../../Firebase/Firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

function CommentForm({ url, publisher }) {
  const [comment, setComment] = useState('');
  const [load, setLoad] = useState('none');

  function handleChange(event) {
    setComment(event.target.value);
  }
  function handleSubmit(event) {
    setLoad('');
    event.preventDefault();
    db.collection(`comments:${publisher}:${url}`)
      .add({
        user: localStorage.getItem('currentUser'),
        comment,
        time: timestamp(),
      })
      .then(() => {
        setComment('');
        setLoad('none');
      });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Ask A Question"
          variant="filled"
          className="chat-field"
          value={comment}
          onChange={handleChange}
          style={{ width: '60%' }}
        />
      </form>
      <CircularProgress style={{ display: load }} />
    </div>
  );
}

export default CommentForm;
