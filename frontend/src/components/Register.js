import React from 'react';
import Buttons from './Buttons';
import { Main, Header, Form, Link } from './Form';
import Input from './Input';

export default function Register(props) {
	const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  //const [isJobseeker, setIsJobseeker] = React.useState(true);
	const [loginstatus, setLoginstatus] = React.useState(null);
	
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
	// const handleJobSeekerChange = (event) => {
  //   setName(event.target.value);
  // }
	async function register(e) {
		console.log(name, email, password, confirmPassword, "KAIQU@@@@@@@@")
		//e.preventDefault();
		// if ()
		const data = {name: name, email: email, password: password};
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

  return (
    <Main>
      <Header>Sign Up</Header>
      <Form id="register">
        <Input type="text" id="Name" value={name} handleChange={handleNameChange}/>
        <Input type="email" id="Email Address" value={email} handleChange={handleEmailChange}/>
        <Input type="password" id="Password" value={password} handleChange={handlePasswordChange}/>
        <Input type="password" id="Confirm Password" value={confirmPassword} handleChange={handleConfirmPasswordChange}/>
        <input type="radio" id="seeker" name="role"></input>
        <label htmlFor="seeker">I'm looking for a job</label>
        <input type="radio" id="employer" name="role"></input>
        <label htmlFor="employer">I'm an Employer</label>
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