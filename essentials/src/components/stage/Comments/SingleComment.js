import React, { useEffect, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { db } from '../../../Firebase/Firebase';
import { IconButton } from '@material-ui/core';
import SubCom from './SubCom';
import firebase from 'firebase/app';
import 'firebase/firestore';

function SingleComment({
  comment,
  user,
  time,
  id,
  url,
  publisher,
  subComments,
}) {
  const [subComArray, setSubComArray] = useState([]);
  const [reply, setReply] = useState('');

  function handleChange(event) {
    setReply(event.target.value);
  }

  function handleDelete() {
    db.collection(`comments:${publisher}:${url}`)
      .doc(`${id}`)
      .delete()
      .then(() => {
        console.log('deleted');
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    db.collection(`comments:${publisher}:${url}`)
      .doc(`${id}`)
      .update({
        SubComments: firebase.firestore.FieldValue.arrayUnion({
          comment: reply,
          user: localStorage.getItem('currentUser'),
        }),
      })
      .then(() => setReply(''));
  }
  useEffect(() => {
    if (subComments) {
      setSubComArray(
        subComments.map((com) => {
          return (
            <SubCom
              user={com.user}
              comment={com.comment}
              key={(com, com.SubComment, Math.random())}
            />
          );
        })
      );
    }
  }, [subComments]);
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{user[0]}</Avatar>
      </ListItemAvatar>
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <ListItemText primary={comment} secondary={time} />
        </AccordionSummary>

        <form onSubmit={handleSubmit}>
          <TextField
            style={{ width: '100%' }}
            value={reply}
            onChange={handleChange}
            label="Answer The Question Here"
          />
        </form>

        <AccordionDetails>
          <div style={{ width: '100%' }}>{subComArray}</div>
        </AccordionDetails>
      </Accordion>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={handleDelete}
          className="deleteButton"
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default SingleComment;
