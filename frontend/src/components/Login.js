import React from 'react';
import Buttons from './Buttons';
import { Main, Header, Form, Link } from './Form';
import Input from './Input';

export default function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  async function login() {
    const data = {email: email, password: password};
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
    const response = await fetch('http://localhost:8000/auth/login', options);
    const json = await response.json();
    console.log(json);
  }

  return (
    <Main>
      <Header>Welcome Back!</Header>
      <Form id="login">
        <Input type="email" id="Email" value={email} onChange={handleEmailChange} />
        <Input type="password" id="Password" value={password} onChange={handlePasswordChange} />
      </Form>
      <Link onClick={props.setRegister}>New around here? No worries, come sign up here</Link>
      <Buttons
        onClickHandler1={login}
        onClickHandler2={props.setMain}
        innerText1="Login"
        innerText2="Back"
      />
    </Main>
  )
}