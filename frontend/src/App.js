import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Employer from './pages/Employer';
import JobSeeker from './pages/JobSeeker';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const login = () => setIsLoggedIn(!isLoggedIn);
  return (
    <Router>
      <Nav login={isLoggedIn}/>
      <Switch>
        <Route
          exact
          path="/"
        >
          <Home />
        </Route>

        <Route
          exact
          path="/login"
        >
          <Login login={login} />
        </Route>

        <Route
          exact
          path="/register"
        >
          <Register login={login} />
        </Route>

        <Route
          exact
          path="/employer"
        >
          <Employer />
        </Route>

        <Route
          exact
          path="/job-seeker"
        >
          <JobSeeker />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
