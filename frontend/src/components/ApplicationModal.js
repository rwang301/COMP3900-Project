import React from 'react';
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';
import { Header, Form } from './Form';
import { ControlledInput } from './Input';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";


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

const Label = styled.label`
  display: block;
  margin-bottom: 1vmin;
  font-size: 3vmin;
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
  margin-top: 2vw;

  &:hover {
    font-weight: bold;
    background: black;
    color: whitesmoke;
    border: 1px solid whitesmoke;
  }
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

export default function ApplicationModal({
  name, setName, password, setPassword, location, setLocation, education, setEducation, skills, setSkills, toShow, setShow, updateProfile,
}) {
  const classes = useStyles();
  const [skill1, setSkill1] = React.useState(skills[0]);
  const [skill2, setSkill2] = React.useState(skills[1]);
  const [skill3, setSkill3] = React.useState(skills[2]);

  const handleSave = () => {
    updateProfile();
    setName(name);
    setPassword(password);
    setLocation(location);
    setEducation(education);
    setSkills([skill1, skill2, skill3]);
    setShow(false);
  };

  return (
    <ModalContainer toShow={toShow}>
      <ModalContent>
        <CloseButton onClick={(e) => {
            e.stopPropagation();
            setShow(false);
        }}/>
        <Header>Edit Profile</Header>
        <Form id="updateProfile">
          <ControlledInput type="text" id="Name" handleChange={(event) => setName(event.target.value)}/>
          <ControlledInput type="password" id="Password" handleChange={(event) => setPassword(event.target.value)}/>
          <ControlledInput type="text" id="Education" handleChange={(event) => setEducation(event.target.value)}/>
          <ControlledInput type="text" id="Location" handleChange={(event) => setLocation(event.target.value)}/>
          <Label>Skills Required</Label>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Skill 1</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={skill1}
              onChange={(event) => setSkill1(event.target.value)}
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
                value={skill2}
                onChange={(event) => setSkill2(event.target.value)}
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
                value={skill3}
                onChange={(event) => setSkill3(event.target.value)}
              >
                <MenuItem value={'Reactjs'}>Reactjs</MenuItem>
                <MenuItem value={'CSS'}>CSS</MenuItem>
                <MenuItem value={'HTML'}>HTML</MenuItem>
                <MenuItem value={'Operating Systems'}>Operating Systems</MenuItem>
                <MenuItem value={'Assembly Language'}>Assembly Language</MenuItem>
                <MenuItem value={'C Programming'}>C Programming</MenuItem>
              </Select>
            </FormControl>
        </Form>
        <Button onClick={handleSave}>Save</Button>
      </ModalContent>
    </ModalContainer>
  )
}