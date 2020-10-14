import React, { useEffect, useState, useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { db } from '../../../Firebase/Firebase';
import MessageForm from './MessageForm';
import Message from './Message';
import { UserContext } from '../../Contexts/UserContext';
import './Log.css';
function Log({ url, dID }) {
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(UserContext);
  
  useEffect(() => {
    db.collection('videos').doc(`${dID}`).onSnapshot(doc => {
      if(doc.data()){
        if(doc.data().messages){
          setMessages(() => {
            return doc.data().messages.map(message => {
              return (
                <Message key={message.time + message.text} message={message} currentUser={currentUser}/>
              )
            })
          })
        }
      }
 
    })
  },[dID, currentUser])
  return (
    <div style={{ height: '100%' }}>
      <Card className="Log" variant="elevation">
        <CardContent className="Log-Content" style={{ height: '92%' }}>
          {messages}
        </CardContent>
        <MessageForm currentUser={currentUser} url={url} dID={dID}/>
      </Card>
    </div>
  );
}

export default Log;
