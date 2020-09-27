import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { db } from '../../Firebase/Firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function JumboTron({ publisher, datePublish, docId }) {
  const { url } = useParams();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [pageTitle, setPageTitle] = React.useState('');
  const [madeTitle, setMadeTitle] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event) => {
    setPageTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    db.collection('videos').doc(docId).update({
      title: pageTitle,
    });
  };

  db.collection('videos')
    .doc(`${docId}`)
    .onSnapshot((doc) => {
      if (doc.data()) {
        console.log(doc.data().title);
        setMadeTitle(doc.data().title);
      }
    });

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {publisher[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          madeTitle ? (
            <h3>{madeTitle}</h3>
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                id="Title"
                autoComplete="off"
                label="Enter Title Here"
                value={pageTitle}
                onChange={handleChange}
              ></TextField>
            </form>
          )
        }
        subheader={`Page Created By Charles on ${
          datePublish.time ? datePublish.time.toDate() : 'loading...'
        }`}
      />

      <CardContent>
        <iframe
          title={url}
          width="100%"
          height="650px"
          src={`https://www.youtube.com/embed/${url}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <Typography variant="body2" color="textSecondary" component="p">
          This a hot ass sun my boy
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        ></IconButton>
      </CardActions>
    </Card>
  );
}
