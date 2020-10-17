import React, { useContext } from 'react';
import { auth } from '../../Firebase/Firebase';
import { uiConfig } from '../../Firebase/Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Background from './Background';
import SelectionMenu from '../SelectionMenu/SelectionMenu';
import SkoolyLogo from '../../images/Essentials.png';
import { UserContext } from '../Contexts/UserContext';
import './Homepage.css';

function Homepage() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  auth.onAuthStateChanged((user) => {
    if (user) {
      //temporary Local Storage Solution
      localStorage.setItem('currentUser', user.displayName);
      localStorage.setItem('photoUrl', auth.currentUser.photoURL);
      localStorage.setItem("email", auth.currentUser.email)
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
          <div>
            <Background />
            <center
              style={{
                marginBottom: '5px',
                position: 'absolute',
                left: '50%',
                top: '40%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div>
                <img src={SkoolyLogo} alt="skooly-logo" />
              </div>

              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={auth}
                style={{
                  margin: 'auto',
                  textAlign: 'center',
                }}
              ></StyledFirebaseAuth>
            </center>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
