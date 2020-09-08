import React from 'react';
import Homepage from './components/homepage/Homepage';
import Stage from './components/stage/stage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeacherMenu from './components/TeacherMenu/TeacherMenu';
import StudentMenu from './components/StudentMenu/StudentMenu';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/teacher/:user" component={TeacherMenu} />
          <Route path="/student" component={StudentMenu} />
          <Route path="/stage/:user/:url" children={<Stage />} />
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
