import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import './MessageCard.css';
import { Avatar } from '@material-ui/core';

function Message({ message }) {
  let chat = {};
  let chatCard = {};
  if (message.user === localStorage.getItem('currentUser')) {
    chat = {
      background: '#4fc3f7',
    };
    chatCard = {
      marginLeft: 'auto',
      marginRight: '10px',
    };
  } else {
    chat = {
      background: '#bdbdbd',
    };
    chatCard = {
      position: 'relative',
    };
  }
  return (
    <div className="Message-card" style={chatCard}>
      <Card>
        <div style={chat}>
          <CardHeader
            className="Message-cardHeader"
            avatar={<Avatar>{message.user[0]}</Avatar>}
            title={`${message.user}: ${message.text}`}
          ></CardHeader>
        </div>
      </Card>
    </div>
  );
}

export default Message;
