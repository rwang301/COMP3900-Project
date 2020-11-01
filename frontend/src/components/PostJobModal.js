import React from 'react';
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';
import { Header, Form } from './Form';
import Input from './Input';
import JobRadios from './JobRadios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalContainer = styled.div`
  display: ${props => props.toShow ? 'block' : 'none'};
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
  margin-top: 0vw;
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

export default function PostJobModal({toShow, setShow, postJob}) {
  const [employmentType, setEmploymentType] = React.useState('part-time');
  const [jobTitle, setJobTitle] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [closingDate, setClosingDate] = React.useState(new Date());

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  }

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

  const handleTypeChange = (event) => {
    setEmploymentType(event.target.value);
  }

  return (
    <ModalContainer toShow={toShow}>
      <ModalContent>
        <CloseButton onClick={(e) => {
            e.stopPropagation();
            setShow(false);
        }}/>
        <Header>Post a Job</Header>
        <Form id="register">
          <Input type="text" id="Job Title" handleChange={handleJobTitleChange}/>
          <Input type="text" id="Location" handleChange={handleLocationChange}/>
          <Input type="text" large={true} id="Description" handleChange={handleDescriptionChange}/>
          <DateText>Application Closing Date:</DateText>
          <DateContainer selected={closingDate} onChange={date => {
            setClosingDate(date);
          }} />
          <JobRadios value={employmentType} onChangeHandler={handleTypeChange}/>
        </Form>
        <Button onClick={() => postJob(jobTitle, location, description, closingDate, employmentType)}>Send</Button>
      </ModalContent>
    </ModalContainer>
  )
}