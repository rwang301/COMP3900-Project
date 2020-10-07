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
        <input type="radio" id="seeker" name="role"></input>
        <label for="seeker">I'm looking for a job</label>
        <input type="radio" id="employer" name="role"></input>
        <label for="employer">I'm an Employer</label>
      </form>
      <p onClick={props.setLogin}>Already had an account? No worries, come login up here</p>
      <Button>Register</Button>
      <Button onClick={props.setMain}>Back</Button>
    </main>
  )
}