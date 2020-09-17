import React, { useContext } from 'react';
import { auth } from '../../Firebase/Firebase';
import { uiConfig } from '../../Firebase/Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Background from './Background';
import SelectionMenu from '../SelectionMenu/SelectionMenu';
import SkoolyLogo from '../../images/Essentials.png';
import Slogan from '../../images/Slogan.png';
import { UserContext } from '../Contexts/UserContext';
import './Homepage.css';

function Homepage() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  auth.onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem('currentUser', user.displayName);
      setCurrentUser(user.displayName);
    } else {
      setCurrentUser(null);
    }
  });

  return (
    <div className="main-app">
      {currentUser ? (
        <div className="SelectionMenu">
          <SelectionMenu />
        </div>
      ) : (
        <div>
          <div style={{ margin: '0 auto' }}>
            <Background />
            <img
              src={SkoolyLogo}
              alt="skooly-logo"
              style={{ position: 'relative', marginLeft: '37vw' }}
            />
            <img
              className="homepage-slogan"
              src={Slogan}
              alt="homepage-slogan"
            ></img>
            <StyledFirebaseAuth
              className="center"
              uiConfig={uiConfig}
              firebaseAuth={auth}
            ></StyledFirebaseAuth>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
