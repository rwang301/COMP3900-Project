import React from 'react';
import { Main, Header, Form, Href, isEmailValid } from '../components/Form';
import API_URL from '../index';
import Buttons from '../components/Buttons';
import { ControlledInput } from '../components/Input';

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
      try {// explicit error checking
        const response = await fetch(`${API_URL}/auth/login`, options);
        // implicit error checking
        if (response.status === 200) {
          const json = await response.json();
          localStorage.setItem('token', json.token);
          props.login();
          return json.employer ? 'employer' : 'job-seeker';
        } else if (response.status === 403) {
          alert('Incorrect email or password');
        } else {
          alert('Oops something went wrong');
        }
      } catch (error) {
        console.warn(error.message);
      }
    }
    return '';
  }

  return (
    <Main>
      <Header>Welcome Back!</Header>
      <Form id="login">
        <ControlledInput type="email" id="Email" value={email} handleChange={handleEmailChange} />
        <ControlledInput type="password" id="Password" value={password} handleChange={handlePasswordChange} />
	    </Form>
      <Href route='register'>New around here? No worries, come sign up here</Href>
      <Buttons
        primaryRoute={login}
        secondaryRoute="/"
        primaryInnerText="Login"
        secondaryInnerText="Back"
      />
    </Main>
  )
}