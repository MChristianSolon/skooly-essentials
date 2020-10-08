import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    width: '100%',
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

export default function JumboGallery({ links, publisher }) {
  const classes = useStyles();
  const tileData = links.map((link) => {
    return {
      img: `http://i3.ytimg.com/vi/${link}/maxresdefault.jpg`,
      title: publisher,
      author: 'me',
    };
  });

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img
              src={tile.img}
              alt={tile.title}
              style={{ height: '100%', width: '100%' }}
            />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              //   actionIcon={

              //     <IconButton aria-label={`star ${tile.title}`}>
              //       <StarBorderIcon className={classes.title} />
              //     </IconButton>
              //   }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
