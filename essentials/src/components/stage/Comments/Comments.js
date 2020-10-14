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

export default function Comments({ url, publisher,dID }) {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    db.collection('videos').doc(`${dID}`).onSnapshot(videos => {
      let vids = videos.data()
      if(vids){
        if(vids.comments){
          setComments(
            vids.comments.map(comment => {
              return(
                <SingleComment
                key={comment.newID}
                id={comment.newID}
                user={comment.user}
                comment={comment.comment}
                time={
                  comment.time
                    ? comment.time.toString()
                    : 'loading...'
                }
                publisher={publisher}
                url={url}
                subComments={vids.subComments}
                dID={dID}
                comments={vids.comments}
              />
              )   
            }) 
          )

        }
 
      }
     
    })

  },[dID, publisher, url])

  return (
    <Card style={{ height: '100vh', overflow: 'scroll' }}>
      <CardContent>
        <CommentForm url={url} publisher={publisher} dID={dID} />
        <List className={classes.root} style={{ margin: '0px auto' }}>
         {comments}
        </List>
      </CardContent>
    </Card>
  );
}
