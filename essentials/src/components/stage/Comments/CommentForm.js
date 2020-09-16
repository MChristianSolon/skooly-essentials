import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { db, timestamp } from '../../../Firebase/Firebase';

function CommentForm({ url, publisher }) {
  const [comment, setComment] = useState('');

  function handleChange(event) {
    setComment(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    db.collection(`comments:${publisher}:${url}`)
      .add({
        user: localStorage.getItem('currentUser'),
        comment,
        time: timestamp(),
      })
      .then(() => {
        setComment('');
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
    </div>
  );
}

export default CommentForm;
