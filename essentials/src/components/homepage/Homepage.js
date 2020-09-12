import React, { useContext } from 'react';
import { auth } from '../../Firebase/Firebase';
import { uiConfig } from '../../Firebase/Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Background from './Background';
import SelectionMenu from '../SelectionMenu/SelectionMenu';
import SkoolyLogo from '../../images/Essentials.png';
import Slogan from '../../images/Slogan.png';
import { UserContext } from '../Contexts/UserContext';
import PrimaryAppBar from '../AppBar/PrimaryAppBar';
import './Homepage.css';

function Homepage() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  auth.onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem('currentUser', user.displayName);
      setCurrentUser(user.displayName);
      console.log('You Are Logged in!', currentUser);
    } else {
      console.log('error no one logged in');
      setCurrentUser(null);
    }
  });

  return (
    <div class="main-app">
      {currentUser ? (
        <div class="SelectionMenu">
          <PrimaryAppBar />
          <SelectionMenu currentUser={currentUser} />
        </div>
      ) : (
        <div className="Homepage">
          <Background />
          <img src={SkoolyLogo} alt="skooly-logo"></img>
          <img
            className="homepage-slogan"
            src={Slogan}
            alt="homepage-slogan"
          ></img>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={auth}
          ></StyledFirebaseAuth>
        </div>
      )}
    </div>
  );
}

export default Homepage;
