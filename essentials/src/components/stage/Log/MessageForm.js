import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { db } from '../../../Firebase/Firebase';
import InputAdornment from '@material-ui/core/InputAdornment';
import Send from '@material-ui/icons/Send';
import './MessageCard.css';

function MessageForm({ currentUser, url, dID }) {
  const [message, setMessage] = useState('');

  //Current refresh fix
  if (currentUser === 'Anonymous') {
    currentUser = localStorage.getItem('currentUser');
  }

  function handleChange(event) {
    setMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(message.length > 0) {
      let currentMessages = []
      db.collection('videos').doc(`${dID}`).get().then((doc) => {
        currentMessages = doc.data().messages
      }).then(() => {
        if(currentMessages){
          currentMessages.push({
            user: currentUser,
            text: message,
            time: new Date()
          })
          db.collection('videos').doc(`${dID}`).update({
            messages: currentMessages
          })
        }else{
          db.collection('videos').doc(`${dID}`).update({
            messages: [{
              user: currentUser,
              text: message,
              time: new Date()
            }]
          })
       
        }
        setMessage("")
      })

    }
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
