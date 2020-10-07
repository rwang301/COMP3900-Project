import React from 'react';
import Nav from "./components/Nav";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import './App.css';

function App() {
  const [state, setState] = React.useState('main');
  const setMain = () => setState('main');
  const setRegister = () => setState('register');
  const setLogin = () => setState('login');
  const states = {
    main: <Main setRegister={setRegister} setLogin={setLogin} />,
    login: <Login setRegister={setRegister} setMain={setMain} />,
    register: <Register setLogin={setLogin} setMain={setMain} />
  };
  React.useEffect(() => {
    async function post(params) {
      const options = {
        method: 'POST'
      }
      const response = await fetch('http://localhost:8000/user/update', options);
      const json = await response.json();
      console.log(json);
    }
    post();
    fetch("http://localhost:8000").then(res => res.json()).then(data => console.log(data));
  }, []);

  return (
    <div className="App">
      <Nav />
      {states[state]}
    </div>
  );
}

export default App;
