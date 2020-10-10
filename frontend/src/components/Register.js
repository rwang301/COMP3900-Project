import React from 'react';
import Button from './Button';
import Form from './Form';
import Input from './Input';

export default function Register(props) {
  React.useEffect(() => {
    async function post(params) {
      const data = {name: 'kaiqi'};
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
      const response = await fetch('http://localhost:8000/user/add', options);
      const json = await response.json();
      console.log(json);
    }
    post();
    fetch("http://localhost:8000").then(res => res.json()).then(data => console.log(data));
  }, []);

  return (
    <main>
      <h1>Sign Up</h1>
      <Form id="register">
        <Input type="text" id="First Name" />
        <Input type="text" id="First Name" />
        <Input type="email" id="Email Address" />
        <Input type="password" id="Password" />
        <Input type="password" id="Confirm Password" />
        <input type="radio" id="seeker" name="role"></input>
        <label for="seeker">I'm looking for a job</label>
        <input type="radio" id="employer" name="role"></input>
        <label for="employer">I'm an Employer</label>
      </Form>
      <p onClick={props.setLogin}>Already had an account? No worries, come login here</p>
      <Button>Register</Button>
      <Button onClick={props.setMain}>Back</Button>
    </main>
  )
}