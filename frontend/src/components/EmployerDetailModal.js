import React from 'react';
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';
import { Header, Form } from './Form';
import { ControlledInput } from './Input';
import JobRadios from './JobRadios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const ModalContainer = styled.div`
  cursor: auto;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-top: 2vw;
  background-color: rgba(0,0,0,0.2);
`;

const ModalContent = styled.div`
  background-color: #d4fafa;
  margin: auto;
  padding: 1.5vw;
  border: 1px solid #888;
  border-radius: 2vw;
  width: 50%;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled(CloseIcon)`
  position: absolute;
  margin-left: 48vw;
  cursor: pointer;
`;

const DateText = styled.p`
  margin-top: 3vw;
`;

const DateContainer = styled(DatePicker)`
  margin-bottom: 1.5vw;
`;

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
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 1vmin;
  font-size: 3vmin;
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function EmployerDetailModal({closeModal, postJob, email, company, location, setEmail, setCompany, setLocation}) {
  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={(e) => {
            e.stopPropagation();
            closeModal();
        }}/>
        <Header>Update Your Details</Header>
        <Form id="register">
          <ControlledInput value={email} type="text" id="Email" handleChange={(e) => setEmail(e.target.value)} />
          <ControlledInput value={company} type="text" id="Company" handleChange={(e) => setCompany(e.target.value)} />
          <ControlledInput value={location} type="text" id="Location" handleChange={(e) => setLocation(e.target.value)} />
        </Form>
        <Button
          onClick={() => {
            console.log('submitted')
          }}
        >
          Save
        </Button>
      </ModalContent>
    </ModalContainer>
  )
}