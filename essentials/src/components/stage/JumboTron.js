import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { db, auth } from '../../Firebase/Firebase';
import firebase from 'firebase'
import BookmarkBorderRounded from '@material-ui/icons/BookmarkBorderRounded';
import JumboGallery from './JumboGallery';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

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
  const { url, user} = useParams();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [pageTitle, setPageTitle] = React.useState('');
  const [madeTitle, setMadeTitle] = React.useState(null);
  const [likes, setLikes] = React.useState(0);
  const [liked, setLiked] = React.useState(false);
  const [add, setAdd] = React.useState(null);
  const [addUrl, setAddUrl] = React.useState('');
  const [links, setLinks] = React.useState([]);
  const [currentVideo, setCurrentVideo] = React.useState("")

  useEffect(() => {
    setCurrentVideo(url)
  },[url])
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

  const handleAdd = () => {
    setAdd((prev) => !prev);
    if (addUrl.length > 1) {
      console.log(addUrl.split('v=')[1].split('&')[0]);
      console.log(links);
    }
  };
  useEffect(() => {
    db.collection('videos')
      .doc(`${docId}`)
      .onSnapshot((doc) => {
        if (doc.data()) {
          setMadeTitle(doc.data().title);
          if (doc.data().playlist) {
            setLinks(doc.data().playlist);
          }
          if (doc.data().likes) {
            setLikes(doc.data().likes);
          }
        }
      });

 db.collection("users").doc(`${auth.currentUser.email}`).get().then((item) => {
  item.data().likedVideos.map(item => {
    if(item.split(':')[0] === url && item.split(':')[1] === user){
      setLiked(true)
    }
  })

 })


  
  }, [docId, url, user]);

  const handleHeart = () => {
    setLiked(true);
    db.collection('videos')
      .doc(`${docId}`)
      .update({
        likes: likes + 1,
      });
      db.collection('users').doc(`${auth.currentUser.email}`).update({
        likedVideos : firebase.firestore.FieldValue.arrayUnion(`${url}:${user}`)
      })
  };

  const handleNewUrl = (event) => {
    event.preventDefault();
    let newUrl = addUrl.split('v=')[1].split('&')[0];
    let newArr = links;
    newArr.push(newUrl);
    if (links) {
      db.collection('videos')
        .doc(`${docId}`)
        .update({
          playlist: newArr,

          // videoUrl: `${addUrl.split('v=')[1].split('&')[0]}`,
        })
        .then(() => {
          setAdd(false);
          setAddUrl('');
        });
    }
  };

  const handleSave = () => {
    const docRef = db.collection('users').doc(`${auth.currentUser.email}`);
    docRef.update({
      saved: firebase.firestore.FieldValue.arrayUnion(`${user}__${url}`)
    }).catch(() => {
      
            console.log("USERCREATED")
            db.collection('users').doc(`${auth.currentUser.email}`).set({
              saved: [`${user}__${url}`]
            },{merge: true})
         
    })
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={localStorage.getItem('photoUrl')}
            className={classes.avatar}
            onClick={() => console.log(likes)}
          >
            {publisher[0]}
          </Avatar>
        }
        action={
          <div>
            <form action="" style={{ float: 'left' }} onSubmit={handleNewUrl}>
              <TextField
                className="Jumbo-new-url"
                placeholder="Enter New Url"
                style={!add ? { display: 'none' } : {}}
                onChange={(event) => setAddUrl(event.target.value)}
                value={addUrl}
              ></TextField>
            </form>
            <IconButton aria-label="settings" onClick={handleAdd}>
              <AddToQueueIcon />
            </IconButton>
            <IconButton aria-label="settings" onClick={handleSave}>
              <BookmarkBorderRounded />
            </IconButton>
          </div>
        }
        title={
          madeTitle ? (
            <div>
              <h3>{madeTitle}</h3>
            </div>
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
          src={`https://www.youtube.com/embed/${currentVideo}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleHeart}
          disabled={liked}
        >
          <FavoriteIcon style={liked ? { color: 'red' } : {}} />
        </IconButton>

        <div style={{ color: 'black', fontSize: '24px' }}>{likes}</div>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton onClick={handleExpandClick}>
          <p>Lesson Videos</p>
          <ExpandMoreIcon />
        </IconButton>
        <div className="JumboTron-play-list">
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <JumboGallery links={links} publisher={publisher} setCurrentVideo={setCurrentVideo}/>
          </Collapse>
        </div>
      </CardActions>
    </Card>
  );
}
