import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import RegisterForm from "./components/RegisterForm";
import "./App.css";
import * as Styled from "./StyledComponents.js";

function App() {
  const [showRegistration, setShowRegistration] = useState(false);
  // useEffect(() => {
  //   fetch("http://localhost:5000")
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);
  return (
    <div className="App">
      <Nav />
      <main id="main">
        <h1>Recruit Assistant</h1>
        <h2>Find your dream job today. Without the hassle.</h2>
        <section id="button-container">
          <Button onClick={() => console.log("hi shani")}>Sign Up</Button>
          <Button>Login</Button>
        </section>
        <RegisterForm />
        {/* {showRegistration && (
          <div id="myModal" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <p>Some text in the Modal..</p>
            </div>
          </div>
        )} */}
        {showRegistration && <p>hi guys!!!!</p>}
        <Styled.SignupButton />
      </main>
    </div>
  );
}

function Button(props) {
  return <button className="primary-button">{props.children}</button>;
}

export default App;
