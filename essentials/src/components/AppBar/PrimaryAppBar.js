import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { UserContext } from '../Contexts/UserContext';
import { SearchContext } from '../Contexts/SearchContext';
import SkoolyIcon from '../../images/LogoSolo.png';
import { auth } from '../../Firebase/Firebase';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import './AppBar.css';

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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const { currentUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { search, setSearch } = useContext(SearchContext);

  function handleLogOut() {
    setAnchorEl(null);
    localStorage.clear();
    auth.signOut();
    window.location.replace('https://skooly.ph/');
  }

  function handleSearchText(event) {
    setSearch(event.target.value);
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>{currentUser}</MenuItem>
            <MenuItem onClick={handleLogOut}>Log-Out</MenuItem>
          </Menu>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={search}
              onChange={handleSearchText}
            />
          </div>
          <Link to="/">
            <img
              src={SkoolyIcon}
              alt="SkoolyIcon"
              style={{
                top: '-2vh',
                width: '100px',
                position: 'absolute',
                left: '45vw',
              }}
            />
          </Link>
        </Toolbar>
      </AppBar>
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
