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
          <div>
            <Background />
            <center>
              <div style={{ marginBottom: '5px' }}>
                <img src={SkoolyLogo} alt="skooly-logo" />
              </div>
              <br></br>

              <div
                style={{
                  margin: 'auto',
                  position: 'relative',
                  bottom: '500px',
                }}
              >
                <div style={{ position: 'relative', top: '45vh' }}>
                  <StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={auth}
                  ></StyledFirebaseAuth>
                </div>
              </div>
            </center>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
