import React from 'react';
import Button from './Button';
import Form from './Form';
import Input from './Input';

export default function Login(props) {
  return (
    <main>
      <h1>Welcome Back!</h1>
      <Form id="login">
        <Input type="email" id="Email" />
        <Input type="password" id="Password" />
      </Form>
      <p onClick={props.setRegister}>New around here? No worries, come sign up here</p>
      <Button>Login</Button>
      <Button onClick={props.setMain}>Back</Button>
    </main>
  )
}