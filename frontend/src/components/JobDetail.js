import React from 'react';
import styled from "styled-components";
import { Header, Form, ModalContainer, ModalContent, CloseButton, Skills } from './Form';
import { ControlledInput, ControlledTextarea } from './Input';
import JobRadios from './JobRadios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { StoreContext } from '../utils/store';

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

export default function JobDetail({setShow, job}) {
  const classes = useStyles();
  const { api } = React.useContext(StoreContext);
  const [employmentType, setEmploymentType] = React.useState('part-time');
  const [jobTitle, setJobTitle] = React.useState('');
  const [skillOne, setSkillOne] = React.useState('');
  const [skillTwo, setSkillTwo] = React.useState('');
  const [skillThree, setSkillThree] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [closingDate, setClosingDate] = React.useState(new Date());

  React.useEffect(() => {
    setEmploymentType(job.employment_type);
    setClosingDate(job.closing_date);
    setDescription(job.description);
    setJobTitle(job.job_title);
    setLocation(job.location);
    const [skill1, skill2, skill3] = job.skills;
    setSkillOne(skill1);
    setSkillTwo(skill2);
    setSkillThree(skill3);
  }, []);

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

  const save = async () => {
    const data = {
      id: job.id,
      job_title: jobTitle,
      location,
      description,
      skills: [skillOne, skillTwo, skillThree],
      employment_type: employmentType,
      closing_date: closingDate
    };
    api.fetch('job', 'put', data);
    setShow(false);
  }

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={(e) => {
            e.stopPropagation();
            setShow(false);
        }}/>
        <Header>Your Job</Header>
        <Form id="register">
          <ControlledInput type="text" id="Job Title" value={jobTitle} handleChange={handleJobTitleChange}/>
          <ControlledInput type="text" id="Location" value={location} handleChange={handleLocationChange}/>
          <ControlledTextarea type="text" id="Description" value={description} handleChange={handleDescriptionChange}/>
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
          <DateContainer width={200} showTimeSelect timeFormat="HH:mm" dateFormat={"dd/MM/yyyy HH:mm:ss"} selected={Date.parse(job.closing_date)} onChange={date => {
            setClosingDate(date);
          }} />
          <JobRadios value={job.employment_type} onChangeHandler={handleTypeChange}/>
        </Form>
        <Button
          onClick={save}
        >
          Save
        </Button>
      </ModalContent>
    </ModalContainer>
  )
}