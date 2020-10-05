import React from 'react';
import logo from './logo.svg';
import './App.css';
import lock from "./lock.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <section id="profile">
          <p>My Profile</p>
          &nbsp;
          <img src={lock} alt="Lock"></img>
        </section>
      </header>

      <main id="main">
        <h1>Recruit Assistant</h1>
        <h2>Find your dream job today. Without the hassle.</h2>
        <section id="button-container">
          <Button>Sign Up</Button>
          <Button>Login</Button>
        </section>
      </main>
    </div>
  );
}

function Button(props) {
  return <button className="primary-button">{props.children}</button>
}

export default App;
