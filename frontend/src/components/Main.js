import React from 'react';
import Button from "./Button";

export default function Main(props) {
  return (
    <main id="main">
      <h1>Recruit Assistant</h1>
      <h2>Find your dream job today. Without the hassle.</h2>
      <section id="button-container">
        <Button onClick={props.setRegister}>Register</Button>
        <Button onClick={props.setLogin}>Login</Button>
      </section>
    </main>
  )
}