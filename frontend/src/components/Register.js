import React from 'react';
import Buttons from './Buttons';
import { Main, Header, Form, Link } from './Form';
import Input from './Input';

export default function Register(props) {
  const register = () => {

  }

  return (
    <Main>
      <Header>Sign Up</Header>
      <Form id="register">
        <Input type="text" id="Name" />
        <Input type="email" id="Email Address" />
        <Input type="password" id="Password" />
        <Input type="password" id="Confirm Password" />
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