import React from 'react';
import { Main, Header, Form, Href, isEmailValid } from './Form';
import API_URL from '../index';
import Buttons from './Buttons';
import Input from './Input';
import Radios from './Radios';

export default function Register(props) {
	const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [employer, setEmployer] = React.useState(true);
	
	const handleNameChange = (event) => {
    setName(event.target.value);
  }

	const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

	const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

	const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  }

	const handleEmployerChange = () => {
    setEmployer(!employer);
  }

	async function register() {
    if (!/^([A-Z][a-z]{1,} ){1,}[A-Z][a-z]{1,}$/.test(name)) {
      alert('Please enter a valid name');
    } else if (!isEmailValid(email)) {
      alert('Please enter a valid email');
    } else if (!password) {
      alert('Please enter your password');
    } else if (password.length < 3) {
      alert('Password must be at least 3 characters long');
    } else if (password !== confirmPassword) {
      alert('Password does not match');
    } else {
      const data = {name: name, email: email, password: password, employer: employer};
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
      const response = await fetch(`${API_URL}/auth/register`, options);
      const json = await response.json();
      if (json.status === 200) {
        props.login() //&& employer ? props.setEmployer() : props.setJobSeeker();
        return 'register';
      }
      else if (json.status === 400) alert('Email already exists');
      else alert('Oops something went wrong');
    }
    return '';
	}

  return (
    <Main>
      <Header>Sign Up</Header>
      <Form id="register">
        <Input type="text" id="Name" value={name} handleChange={handleNameChange} />
        <Input type="email" id="Email Address" value={email} handleChange={handleEmailChange} />
        <Input type="password" id="Password" value={password} handleChange={handlePasswordChange} />
        <Input type="password" id="Confirm Password" value={confirmPassword} handleChange={handleConfirmPasswordChange} />
        <Radios
          value={employer}
          onChangeHandler={handleEmployerChange}
        />
      </Form>
      <Href route='login'>Already had an account? No worries, come login here</Href>
      <Buttons
        primaryRoute={register}
        secondaryRoute='/'
        primaryInnerText='Register'
        secondaryInnerText='Back'
      />
    </Main>
  )
}