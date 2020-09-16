import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { UserContext } from '../Contexts/UserContext';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SkoolyIcon from '../../images/Essentials.png';
import { auth } from '../../Firebase/Firebase';
import { Link } from 'react-router-dom';
import './AppBar.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '5vh',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    color: 'white',
    backgroundColor: '#212121',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { currentUser } = useContext(UserContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const PrimaryAppBar = () => {
    setOpen(false);
  };

  function handleLogOut() {
    localStorage.clear();
    auth.signOut();
    window.location.replace('http://localhost:3000/');
  }

  return (
    <div
      className={classes.root}
      style={localStorage.getItem('currentUser') ? {} : { display: 'none' }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img
              src={SkoolyIcon}
              alt="SkoolyIcon"
              style={{
                top: '-2vh',
                width: '100px',
                position: 'absolute',
                marginLeft: '40vw',
              }}
            />
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={PrimaryAppBar}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Gallery', 'Profile', 'Selection Menu', 'Create Page'].map(
            (text, index) => (
              <Link
                to={
                  text === 'Create Page'
                    ? `/teacher/${currentUser}`
                    : text === 'Gallery'
                    ? '/'
                    : text == 'Profile'
                    ? `/profile`
                    : `/student`
                }
                key={text}
              >
                <ListItem button key={text} style={{ color: 'white' }}>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <InboxIcon style={{ color: 'white' }} />
                    ) : (
                      <MailIcon style={{ color: 'white' }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            )
          )}
        </List>
        <Divider />
        <List>
          {['Logout'].map((text, index) => (
            <ListItem button key={text} onClick={handleLogOut}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon style={{ color: 'white' }} />
                ) : (
                  <MailIcon style={{ color: 'white' }} />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
