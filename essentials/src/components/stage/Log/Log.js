import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { db } from '../../../Firebase/Firebase';
import MessageForm from './MessageForm';
import Message from './Message';
import './Log.css';
function Log({ currentUser }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection('messagesURL')
      .orderBy('time')
      .onSnapshot((snapshot) => {
        setMessages(() => {
          let messageArr = snapshot.docs.map((doc) => {
            return <Message message={doc.data()} currentUser={currentUser} />;
          });
          return messageArr;
        });
      });
  }, []);
  return (
    <div>
      <Card className="Log" variant="elevation">
        <CardContent className="Log-Content">{messages}</CardContent>
        <MessageForm currentUser={currentUser} />
      </Card>
    </div>
  );
}

export default Log;
