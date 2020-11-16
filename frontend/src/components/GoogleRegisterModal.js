import React from 'react'
import styled from "styled-components";
import { Header, Form, ModalContainer, ModalContent, CloseButton } from './Form';
import { ControlledInput } from './Input';
import Radios from '../components/Radios';
import { Redirect } from 'react-router-dom';

const Button = styled.button`
  width: 13vmin;
  height: 5vmin;
  font-size: 1.5vmin;
  border-radius: 5px;
  background: whitesmoke;
  color: black;
  border: 3px solid darkcyan;
  margin: 0.75vw;

  &:hover {
    font-weight: bold;
    background: black;
    color: whitesmoke;
    border: 1px solid whitesmoke;
  };
`;


export default function GoogleRegisterModal({closeModal, email, setEmail, name, setName, employer, updateEmployer, register}) {
  const [success, setSuccess] = React.useState();
  async function handleRegister() {
    const res = await register();
    if (res) {
      setSuccess(res);
    }
  }
  
  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={(e) => {
          closeModal();
        }}/>
        <Header>Google Onboarding</Header>
        <Form id="register">
          <ControlledInput value={email} type="text" id="Email" handleChange={setEmail}/>
          <ControlledInput value={name} type="text" id="Name" handleChange={setName}/>
          <Radios
            value={employer}
            onChangeHandler={updateEmployer}
          />
        </Form>
        <Button onClick={handleRegister}>
          Register
        </Button>
      </ModalContent>
      {success && <Redirect to={success} />}
    </ModalContainer>
  )
}
