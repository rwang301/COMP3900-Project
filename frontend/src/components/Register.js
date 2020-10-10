import React from 'react';
import Buttons from './Buttons';
import { Main, Header, Form, Link, isEmailValid } from './Form';
import Input from './Input';

export default function Register(props) {
	const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [employer, setEmployer] = React.useState(true);
  const [jobSeeker, setJobSeeker] = React.useState(false);
	
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

	const handleJobSeekerChange = () => {
    setJobSeeker(!jobSeeker);
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
      const response = await fetch('http://localhost:8000/auth/register', options);
      const json = await response.json();
      console.log(json)
    }
	}

  return (
    <Main>
      <Header>Sign Up</Header>
      <Form id="register">
        <Input type="text" id="Name" value={name} handleChange={handleNameChange} />
        <Input type="email" id="Email Address" value={email} handleChange={handleEmailChange} />
        <Input type="password" id="Password" value={password} handleChange={handlePasswordChange} />
        <Input type="password" id="Confirm Password" value={confirmPassword} handleChange={handleConfirmPasswordChange} />
        <input type="radio" id="employer" name="role" checked={employer} onChange={handleEmployerChange} />
        <label htmlFor="employer">I'm an Employer</label>
        <input type="radio" id="seeker" name="role" checked={jobSeeker} onChange={handleJobSeekerChange} />
        <label htmlFor="seeker">I'm looking for a job</label>
      </Form>
      <Link onClick={props.setLogin}>Already had an account? No worries, come login here</Link>
      <Buttons
        onClickHandler1={register}
        onClickHandler2={props.setMain}
        innerText1="Register"
        innerText2="Back"
      />
    </Main>
  )

  /*
  React.useEffect(() => {
    post();
    fetch("http://localhost:8000").then(res => res.json()).then(data => console.log(data));
  }, []);
  */
}