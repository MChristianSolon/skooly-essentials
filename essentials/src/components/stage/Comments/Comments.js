import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import SingleComment from './SingleComment';
import CommentForm from './CommentForm';
import { db } from '../../../Firebase/Firebase';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Comments({ url, publisher }) {
  const classes = useStyles();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    db.collection(`comments:${publisher}:${url}`)
      .orderBy('time')
      .onSnapshot((snap) => {
        setComments(
          snap.docs.map((doc) => {
            return (
              <SingleComment
                key={doc.id}
                id={doc.id}
                user={doc.data().user}
                comment={doc.data().comment}
                time={
                  doc.data().time
                    ? doc.data().time.toDate().toString()
                    : 'loading...'
                }
                publisher={publisher}
                url={url}
              />
            );
          })
        );
      });
  }, []);

  return (
    <Card style={{ height: '100vh', overflow: 'scroll' }}>
      <CardContent>
        <CommentForm url={url} publisher={publisher} />
        <List className={classes.root} style={{ margin: '0px auto' }}>
          {comments}
        </List>
      </CardContent>
    </Card>
  );
}
