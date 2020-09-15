import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { db } from '../../../Firebase/Firebase';
import { IconButton } from '@material-ui/core';

function SingleComment({ comment, user, time, id, url, publisher }) {
  function handleDelete() {
    console.log(id);
    db.collection(`comments:${publisher}:${url}`)
      .doc(`${id}`)
      .delete()
      .then(() => {
        console.log('deleted');
      });
  }
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{user[0]}</Avatar>
      </ListItemAvatar>
      <Accordion>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <ListItemText primary={comment} secondary={time} />
        </AccordionSummary>
        <AccordionDetails>
          <Card>
            <CardContent>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </CardContent>
          </Card>
          <TextField />
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
