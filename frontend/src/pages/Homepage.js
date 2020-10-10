import React from 'react';
import Nav from '../components/Nav';
import Main from '../components/Main';
import Login from '../components/Login';
import Register from '../components/Register';
import '../App.css';

export default function Homepage() {
  const [state, setState] = React.useState('login');
  const setMain = () => setState('main');
  const setRegister = () => setState('register');
  const setLogin = () => setState('login');
  const states = {
    main: <Main setRegister={setRegister} setLogin={setLogin} />,
    login: <Login setRegister={setRegister} setMain={setMain} />,
    register: <Register setLogin={setLogin} setMain={setMain} />
  };

  return (
    <div className="App">
      <Nav />
      {states[state]}
    </div>
  );
}