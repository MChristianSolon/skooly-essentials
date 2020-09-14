import React, { useState, useMemo } from 'react';
import Homepage from './components/homepage/Homepage';
import Stage from './components/stage/stage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeacherMenu from './components/TeacherMenu/TeacherMenu';
import StudentMenu from './components/StudentMenu/StudentMenu';
import { UserContext } from './components/Contexts/UserContext';
import PrimaryAppBar from './components/AppBar/PrimaryAppBar';
import Profile from './components/Profile/Profile';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState('Anonymous');
  const logProviderValue = useMemo(() => ({ currentUser, setCurrentUser }), [
    currentUser,
    setCurrentUser,
  ]);
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={logProviderValue}>
          <Route path="/" exact component={Homepage} />
          <Route path="/" component={PrimaryAppBar} />
          <Switch>
            <Route path="/teacher/:user" component={TeacherMenu} />
            <Route path="/student" component={StudentMenu} />
            <Route path="/profile" children={<Profile />} />
            <Route path="/stage/:user/:url" children={<Stage />} />
            {/* <Route
              path={'/'}
              render={() => <h2 style={{ color: 'black' }}>404</h2>}
            /> */}
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
