import React from 'react';
import styled from "styled-components";
import Nav from '../components/Nav';
import Main from '../components/Main';
import Login from '../components/Login';
import Register from '../components/Register';

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

  const Div = styled.div`
    background-color: #282c34;
    color: whitesmoke;
    min-height: 100vh;
    padding: 0 10%;
  `;

  return (
    <Div>
      <Nav />
      {states[state]}
    </Div>
  );
}