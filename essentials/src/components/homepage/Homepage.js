import React, { useState } from 'react';
import { auth } from '../../Firebase/Firebase';
import { uiConfig } from '../../Firebase/Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Background from './Background';
import SelectionMenu from '../SelectionMenu/SelectionMenu';
import SkoolyLogo from '../../images/Essentials.png';
import Slogan from '../../images/Slogan.png';
import './Homepage.css';

function Homepage() {
  const [currentUser, setCurrentUser] = useState(null);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
      console.log('You Are Logged in!', user.displayName);
    } else {
      console.log('error no one logged in');
      setCurrentUser(null);
    }
  });

  return (
    <div>
      <Background />
      {currentUser ? (
        <>
          <SelectionMenu currentUser={currentUser} />
        </>
      ) : (
        <div className="Homepage">
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
