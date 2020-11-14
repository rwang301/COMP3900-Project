import React from 'react';
import { Main, Header, Form, Href, isEmailValid } from '../components/Form';
import { API_URL } from '../utils/api';
import Buttons from '../components/Buttons';
import { ControlledInput } from '../components/Input';
import { StoreContext } from '../utils/store';

export default function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setAlert } = React.useContext(StoreContext);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  async function login() {
    if (!isEmailValid(email)) {
      setAlert({ open: true, severity: 'warning', message: 'Please enter a valid email' });
    } else if (!password) {
      setAlert({ open: true, severity: 'warning', message: 'Please enter your password' });
    } else if (password.length < 3) {
      setAlert({ open: true, severity: 'warning', message: 'Password must be at least 3 characters long' });
    } else {
      const data = { email, password };
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
          props.login(json.token);
          return json.employer ? 'employer' : 'jobseeker';
        } else if (response.status === 403) {
          setAlert({ open: true, severity: 'error', message: 'Incorrect email or password' });
        } else {
          setAlert({ open: true, severity: 'error', message: 'Oops something went wrong' });
        }
      } catch (error) {
        setAlert({ open: true, severity: 'warning', message: error.message });
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
