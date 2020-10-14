import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { db } from '../../../Firebase/Firebase';
import CircularProgress from '@material-ui/core/CircularProgress';

function CommentForm({ url, publisher, dID }) {
  const [comment, setComment] = useState('');
  const [load, setLoad] = useState('none');

  function handleChange(event) {
    setComment(event.target.value);
  }
  function handleSubmit(event) {
    setLoad('');
    event.preventDefault();
    let currentComments = []
    db.collection('videos').doc(`${dID}`).get().then(item => {
        currentComments = item.data().comments
    }).then(() => {
      if(currentComments){
        currentComments.push({
          user: localStorage.getItem('currentUser'),
          comment,
          time: new Date(),
          newID: Math.random()
        })
        db.collection('videos').doc(`${dID}`).update({
          comments: currentComments
        })
      }else{
        db.collection('videos').doc(`${dID}`).update({
          comments: [{
            user: localStorage.getItem('currentUser'),
            comment,
            time: new Date(),
            newID: Math.random()
          }]
        })
      }
    })
        setComment('');
        setLoad('none');
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
