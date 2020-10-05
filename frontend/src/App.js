import React from 'react';
import Nav from "./components/Nav";
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
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
