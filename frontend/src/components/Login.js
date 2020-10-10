import React from 'react';
import Button from './Button';

export default function Login(props) {
  return (
    <main>
      <h1>Welcome Back!</h1>
      <form id="login">
        <input type="email" placeholder="Email Address"></input>
        <input type="password" placeholder="Password"></input>
      </form>
      <p onClick={props.setRegister}>New around here? No worries, come sign up here</p>
      <Button>Login</Button>
      <Button onClick={props.setMain}>Back</Button>
    </main>
  )
}