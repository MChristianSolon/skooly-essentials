import React from 'react';
import './SelectionMenu.css';
import Button from '@material-ui/core/Button';
import { auth } from '../../Firebase/Firebase';
import { Link } from 'react-router-dom';

function SelectionMenu({ currentUser }) {
  function handleLogOut() {
    auth.signOut();
  }
  return (
    <div className="selectionMenu">
      <h1>
        Hey,
        <div className="selectionMenu-user">{currentUser.displayName}!</div>
        <br></br>What are you using{' '}
        <div className="selectionMenu-skooly">Skooly</div> for?
      </h1>

      <Link to={`/teacher/${currentUser.displayName}`}>
        <Button
          className="selectionMenu-button"
          size="large"
          variant="contained"
          style={{ background: '#ff5757', color: 'white' }}
        >
          <h1>Teacher</h1>
        </Button>
      </Link>

      <Link to="/student">
        <Button
          className="selectionMenu-button"
          size="large"
          variant="contained"
          color="primary"
        >
          <h1>Student</h1>
        </Button>
      </Link>

      <Button variant="contained" onClick={handleLogOut}>
        Log-Out
      </Button>
    </div>
  );
}

export default SelectionMenu;
