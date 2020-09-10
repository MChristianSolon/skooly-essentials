import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { db, timestamp } from '../../../Firebase/Firebase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Send from '@material-ui/icons/Send';
import './MessageCard.css';

function MessageForm({ currentUser }) {
  const [message, setMessage] = useState('');

  function handleChange(event) {
    setMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    db.collection('messagesURL').add({
      user: currentUser,
      text: message,
      time: timestamp(),
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
