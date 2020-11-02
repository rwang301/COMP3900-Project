import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Employer from './pages/Employer';
import JobSeeker from './pages/JobSeeker';
import EmployerProfilePage from './pages/EmployerProfilePage';
import JobseekerProfilePage from './pages/JobseekerProfilePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <Router>
      <Nav login={isLoggedIn} logout={logout} />
      <Switch>
        <Route exact path="/login">
          <Login login={login} />
        </Route>

        <Route exact path="/register">
          <Register login={login} />
        </Route>

        <Route exact path="/employer">
          <Employer />
        </Route>

        <Route exact path="/job-seeker">
          <JobSeeker />
        </Route>

        <Route exact path="/employer-profile">
          <EmployerProfilePage />
        </Route>

        <Route exact path="/jobseeker-profile">
          <JobseekerProfilePage />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
