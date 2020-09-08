import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { db, timestamp } from '../../../Firebase/Firebase';

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
    <div className="Log-chat-form">
      <form onSubmit={handleSubmit}>
        <TextField
          variant="filled"
          value={message}
          onChange={handleChange}
          style={{ width: '60%' }}
        />
      </form>
    </div>
  );
}

export default MessageForm;
