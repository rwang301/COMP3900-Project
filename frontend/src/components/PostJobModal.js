import React from 'react';
import styled from "styled-components";
import { Header, Form, ModalContainer, ModalContent, CloseButton, Skills } from './Form';
import { ControlledInput } from './Input';
import JobRadios from './JobRadios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";

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

export default function PostJobModal({closeModal, postJob}) {
  const classes = useStyles();
  const [employmentType, setEmploymentType] = React.useState('part-time');
  const [jobTitle, setJobTitle] = React.useState('');
  const [skillOne, setSkillOne] = React.useState('');
  const [skillTwo, setSkillTwo] = React.useState('');
  const [skillThree, setSkillThree] = React.useState('');
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

  const resetFields = () => {
    setJobTitle('');
    setLocation('');
    setDescription('');
    setSkillOne('');
    setSkillTwo('');
    setSkillThree('');
    setClosingDate(new Date());
    setEmploymentType('part-time');
  };

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={(e) => {
            e.stopPropagation();
            closeModal();
        }}/>
        <Header>Post a Job</Header>
        <Form id="register">
          <ControlledInput value={jobTitle} type="text" id="Job Title" handleChange={handleJobTitleChange}/>
          <ControlledInput value={location} type="text" id="Location" handleChange={handleLocationChange}/>
          <ControlledInput value={description} type="text" large={true} id="Description" handleChange={handleDescriptionChange}/>
          <Label>Skills Required</Label>
          <FormControl className={classes.formControl}>
            <Skills
              label="Skill 1"
              value={skillOne}
              onChange={(value) => setSkillOne(value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Skills
              label="Skill 2"
              value={skillTwo}
              onChange={(value) => setSkillTwo(value)}
           />
          </FormControl>
          <FormControl className={classes.formControl}>
            <Skills
              label="Skill 3"
              value={skillThree}
              onChange={(value) => setSkillThree(value)}
            />
          </FormControl>
          <DateText>Application Closing Date:</DateText>
          <DateContainer width={200} showTimeSelect timeFormat="HH:mm" dateFormat={"dd/MM/yyyy HH:mm:ss"} selected={closingDate} onChange={date => {
            setClosingDate(date);
          }} />
          <JobRadios value={employmentType} onChangeHandler={handleTypeChange}/>
        </Form>
        <Button
          onClick={() => {
            postJob(jobTitle, location, description, skillOne, skillTwo, skillThree, closingDate, employmentType);
            resetFields();
          }}
        >
          Post
        </Button>
      </ModalContent>
    </ModalContainer>
  )
}