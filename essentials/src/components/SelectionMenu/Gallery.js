import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
function Gallery({ publisher, url, title }) {
  return (
    <Grid item xs={4}>
      <div style={{ marginBottom: '5vh' }}>
        <Card style={{ height: '40vh' }}>
          <Link to={`/stage/${publisher}/${url}`}>
            <CardMedia
              style={{ height: 0, paddingTop: '46.25%' }}
              image={`http://i3.ytimg.com/vi/${url}/maxresdefault.jpg`}
            ></CardMedia>
          </Link>
          <CardContent>
            <h2 className="titleName">{title ? title : 'untitled'}</h2>
            <Typography
              gutterBottom
              variant="p"
              component="h4"
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar
                style={{ height: '30px', width: '30px' }}
              >{`${publisher[0]}`}</Avatar>
              <b style={{ marginLeft: '10px' }}>{`${publisher}`}</b>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Grid>
  );
}

export default Gallery;
