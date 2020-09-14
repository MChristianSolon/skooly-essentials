import React, { useEffect, useState, useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { db } from '../../../Firebase/Firebase';
import MessageForm from './MessageForm';
import Message from './Message';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
import './Log.css';
function Log({ url }) {
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(UserContext);
  const { user } = useParams();

  useEffect(() => {
    console.log('LogFUck');
    let action = db
      .collection(`messages:${user}:${url}`)
      .orderBy('time')
      .onSnapshot((snapshot) => {
        setMessages(() => {
          let messageArr = snapshot.docs.map((doc) => {
            return (
              <Message
                key={doc.id}
                message={doc.data()}
                currentUser={currentUser}
              />
            );
          });
          return messageArr;
        });
        return action;
      });
  }, [currentUser, user, url]);
  return (
    <div>
      <Card className="Log" variant="elevation">
        <CardContent className="Log-Content">{messages}</CardContent>
        <MessageForm currentUser={currentUser} url={url} />
      </Card>
    </div>
  );
}

export default Log;
