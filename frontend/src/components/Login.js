import React from 'react';
import Buttons from './Buttons';
import { Main, Header, Form, Link } from './Form';
import Input from './Input';

export default function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginstatus, setLoginstatus] = React.useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  async function login(e) {
	e.preventDefault();
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (email === "" || password === "") {
        setLoginstatus("Email and/or Password cannot be empty!");
    } else if (!emailRegex.test(email)) {
        setLoginstatus("Please use a valid email")
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
            setLoginstatus("Successful Login")
        } else {
			setLoginstatus("Email and/or Password is incorrect!")
        }
    }

  }

  return (
    <Main>
      <Header>Welcome Back!</Header>
      <Form id="login">
        <Input type="email" id="Email" value={email} handleChange={handleEmailChange} />
        <Input type="password" id="Password" value={password} handleChange={handlePasswordChange} />
      <Link onClick={props.setRegister}>New around here? No worries, come sign up here</Link>
      <Buttons
        onClickHandler1={(e) => login(e)}
        onClickHandler2={props.setMain}
        innerText1="Login"
        innerText2="Back"
      />
	</Form>
      <div>{loginstatus}</div>
    </Main>
  )
}