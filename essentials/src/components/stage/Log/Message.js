import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import './MessageCard.css';
import { Avatar } from '@material-ui/core';

function Message({ message, currentUser }) {
  let style = {};
  if (currentUser == message.user) {
    style = {
      color: 'blue',
    };
  } else {
  }
  return (
    <div className="Message-card" style={style}>
      <Card>
        <CardHeader
          className="Message-cardHeader"
          avatar={<Avatar>{message.user[0]}</Avatar>}
          title={`${message.user}: ${message.text}`}
        ></CardHeader>
      </Card>
    </div>
  );
}

export default Message;
