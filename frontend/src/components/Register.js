import React from 'react';
import Button from "./Button";

export default function Register(props) {
  return (
    <main>
      <h1>Sign Up</h1>
      <form id="register">
        <input type="text" placeholder="First Name"></input>
        <input type="text" placeholder="First Name"></input>
        <input type="email" placeholder="Email Address"></input>
        <input type="password" placeholder="Password"></input>
        <input type="password" placeholder="Confirm Password"></input>
      </form>
      <p onClick={props.setLogin}>Already had an account? No worries, come login up here</p>
      <Button>Register</Button>
      <Button onClick={props.setMain}>Back</Button>
    </main>
  )
}