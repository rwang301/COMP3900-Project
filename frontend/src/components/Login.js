import React from 'react';
import Buttons from './Buttons';
import { Main, Header, Form, Link, isEmailValid } from './Form';
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
    if (!email || !password) {
      alert('Please enter all the fields');
    } else if (!isEmailValid(email)) {
      alert('Please enter a valid email');
    } else {
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
      if (json.status === 200) {
        alert("Successful Login");
      } else {
        alert("Email and/or Password is incorrect!");
      }
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