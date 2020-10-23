import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'


function SavedVideo({data}) {
  const [url, setUrl] = useState('')
  const [creator, setCreator] = useState('')

  useEffect(() => {
    setUrl(data.split("__")[1])
    setCreator(data.split("__")[0])
  },[data])
    const useStyles = makeStyles({
        root: {
          maxWidth: 345,
          float: "left",
          margin: "40px"
        },
      });
      const classes = useStyles();
    return (
        <div className="savedVideo">
            <Card className={classes.root}>
      <CardActionArea>
        <Link to={`/stage/${creator}/${url}`} >
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={`http://i3.ytimg.com/vi/${
            url
          }/maxresdefault.jpg`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {creator}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           
          </Typography>
        </CardContent>
        </Link>
      </CardActionArea>

      <CardActions>
        <Button size="small" color="primary">
          CopyUrl
        </Button>
        <Button size="small" color="primary">
          Unsave
        </Button>
      </CardActions>
    </Card>
        </div>
    )
}

export default SavedVideo
