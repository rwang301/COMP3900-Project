import React from 'react';
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Employer from './pages/Employer';
import JobSeeker from './pages/JobSeeker';
import EmployerProfilePage from './pages/EmployerProfilePage';
import JobseekerProfilePage from './pages/JobseekerProfilePage';
import Swiping from './pages/Swiping';
import Matches from './pages/Matches';
import Footer from './components/Footer';
import Alert from './components/Alert';

const Main = styled.main`
  padding: 5% 10%;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('token'));

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Main>
        <Nav login={isLoggedIn} logout={logout} />
        <Alert />
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

          <Route exact path="/jobseeker">
            <JobSeeker />
          </Route>

          <Route exact path="/employer-profile">
            <EmployerProfilePage />
          </Route>

          <Route exact path="/jobseeker-profile">
            <JobseekerProfilePage />
          </Route>

          <Route exact path="/swiping">
            <Swiping />
          </Route>

          <Route exact path="/matches">
            <Matches />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Main>
      <Footer/>
    </Router>
  )
}

export default App;
