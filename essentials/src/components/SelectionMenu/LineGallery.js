import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { db } from '../../Firebase/Firebase';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    height: '50vh',
    width: '100vw',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default function LineGallery() {
  const classes = useStyles();
  const [tileData, setTileData] = useState([
    { img: '', title: '', author: '' },
  ]);

  useEffect(() => {
    let getGallery = db.collection('videos').onSnapshot((snap) => {
      setTileData(
        snap.docs.map((doc) => {
          return {
            img: `http://i3.ytimg.com/vi/${
              doc.data().videoUrl
            }/maxresdefault.jpg`,
            author: doc.data().publisher,
            title: doc.data().publisher,
            url: doc.data().videoUrl,
          };
        })
      );
      getGallery();
    });
  }, []);

  return (
    <div className={classes.root} style={{ backgroundColor: 'white' }}>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map((tile) => (
          <Link
            to={`/stage/${tile.author}/${tile.url}`}
            style={{ textDecoration: 'none' }}
            key={tile.img}
          >
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} style={{ height: '50vh' }} />
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${tile.title}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          </Link>
        ))}
      </GridList>
    </div>
  );
}
