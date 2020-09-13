import React, { useState, useMemo } from 'react';
import Homepage from './components/homepage/Homepage';
import Stage from './components/stage/stage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeacherMenu from './components/TeacherMenu/TeacherMenu';
import StudentMenu from './components/StudentMenu/StudentMenu';
import { UserContext } from './components/Contexts/UserContext';
import PrimaryAppBar from './components/AppBar/PrimaryAppBar';

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
        <Switch>
          <UserContext.Provider value={logProviderValue}>
            <Route path="/" exact component={Homepage} />
            <PrimaryAppBar />
            <Switch>
              <Route path="/teacher/:user" component={TeacherMenu} />
              <Route path="/student" component={StudentMenu} />
              <Route path="/stage/:user/:url" children={<Stage />} />
            </Switch>
          </UserContext.Provider>
          <Route
            path="/"
            render={() => <h2 style={{ color: 'black' }}>404</h2>}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
