import React from 'react';
import { Main, Header, Form, Link, isEmailValid } from './Form';
import API_URL from '../index';
import Buttons from './Buttons';
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
    if (!isEmailValid(email)) {
      alert('Please enter a valid email');
    } else if (!password) {
      alert('Please enter your password');
    } else if (password.length < 3) {
      alert('Password must be at least 3 characters long');
    } else {
      const data = {email: email, password: password};
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
      const response = await fetch(`${API_URL}/auth/login`, options);
      const json = await response.json();
      if (json.status === 200) props.login() && json.employer ? props.setEmployer() : props.setJobSeeker();
      else if (json.status === 403) alert('Incorrect email or password');
      else alert('Oops something went wrong');
    }
  }

  return (
    <Main>
      <Header>Welcome Back!</Header>
      <Form id="login">
        <Input type="email" id="Email" value={email} handleChange={handleEmailChange} />
        <Input type="password" id="Password" value={password} handleChange={handlePasswordChange} />
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