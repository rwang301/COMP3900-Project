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

  const handleSkillOneChange = (event) => {
    setSkillOne(event.target.value);
  };

  const handleSkillTwoChange = (event) => {
    setSkillTwo(event.target.value);
  };

  const handleSkillThreeChange = (event) => {
    setSkillThree(event.target.value);
  };

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
            <InputLabel id="demo-simple-select-label">Skill 1</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={skillOne}
                onChange={handleSkillOneChange}
              >
                <MenuItem value={'Reactjs'}>Reactjs</MenuItem>
                <MenuItem value={'CSS'}>CSS</MenuItem>
                <MenuItem value={'HTML'}>HTML</MenuItem>
                <MenuItem value={'Operating Systems'}>Operating Systems</MenuItem>
                <MenuItem value={'Assembly Language'}>Assembly Language</MenuItem>
                <MenuItem value={'C Programming'}>C Programming</MenuItem>
              </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Skill 2</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={skillTwo}
                onChange={handleSkillTwoChange}
              >
                <MenuItem value={'Reactjs'}>Reactjs</MenuItem>
                <MenuItem value={'CSS'}>CSS</MenuItem>
                <MenuItem value={'HTML'}>HTML</MenuItem>
                <MenuItem value={'Operating Systems'}>Operating Systems</MenuItem>
                <MenuItem value={'Assembly Language'}>Assembly Language</MenuItem>
                <MenuItem value={'C Programming'}>C Programming</MenuItem>
              </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Skill 3</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={skillThree}
                onChange={handleSkillThreeChange}
              >
                <MenuItem value={'Reactjs'}>Reactjs</MenuItem>
                <MenuItem value={'CSS'}>CSS</MenuItem>
                <MenuItem value={'HTML'}>HTML</MenuItem>
                <MenuItem value={'Operating Systems'}>Operating Systems</MenuItem>
                <MenuItem value={'Assembly Language'}>Assembly Language</MenuItem>
                <MenuItem value={'C Programming'}>C Programming</MenuItem>
              </Select>
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