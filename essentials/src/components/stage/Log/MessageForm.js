import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { db, timestamp } from '../../../Firebase/Firebase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Send from '@material-ui/icons/Send';
import './MessageCard.css';
import { useParams } from 'react-router-dom';

function MessageForm({ currentUser, url }) {
  const [message, setMessage] = useState('');
  const { user } = useParams();

  //Current refresh fix
  if (currentUser === 'Anonymous') {
    currentUser = localStorage.getItem('currentUser');
  }

  function handleChange(event) {
    setMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    db.collection(`messages:${user}:${url}`)
      .add({
        user: currentUser,
        text: message,
        time: timestamp(),
      })
      .then(() => {
        setMessage('');
      });
  }
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        label="Enter A Message"
        variant="filled"
        className="chat-field"
        value={message}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Send />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default MessageForm;
