import React, { useState, useMemo } from 'react';
import Homepage from './components/homepage/Homepage';
import Stage from './components/stage/stage';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import TeacherMenu from './components/TeacherMenu/TeacherMenu';
import StudentMenu from './components/StudentMenu/StudentMenu';
import { UserContext } from './components/Contexts/UserContext';
import { SearchContext } from './components/Contexts/SearchContext';
import PrimaryAppBar from './components/AppBar/PrimaryAppBar';
import Profile from './components/Profile/Profile';

import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState('Anonymous');
  const logProviderValue = useMemo(() => ({ currentUser, setCurrentUser }), [
    currentUser,
    setCurrentUser,
  ]);

  const [search, setSearch] = useState('');
  const searchProviderValue = useMemo(() => ({ search, setSearch }), [
    search,
    setSearch,
  ]);
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={logProviderValue}>
          <SearchContext.Provider value={searchProviderValue}>
            <Route path="/" exact component={Homepage} />
            <Route path="/" component={PrimaryAppBar} />
            <Switch>
              <Route path="/teacher/:user" component={TeacherMenu} />
              <Route path="/student" component={StudentMenu} />
              <Route path="/profile/:user/:email" children={<Profile />} />
              <Route path="/stage/:user/:url" children={<Stage />} />
            </Switch>
          </SearchContext.Provider>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
