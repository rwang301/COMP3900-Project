import React from 'react';
import styled from "styled-components";
import { Header, Form, ModalContainer, ModalContent, CloseButton, EditAvatar } from './Form';
import { ControlledInput } from './Input';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
  name, setName, password, setPassword, location, setLocation, profile, setProfile, education, setEducation, skills, setSkills, cancel, updateProfile,
}) {
  const classes = useStyles();
  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={(e) => {
            e.stopPropagation();
            cancel();
        }}/>
        <Header>Edit Profile</Header>
        <EditAvatar profile={profile} setProfile={setProfile} />
        <Form id="updateProfile">
          <ControlledInput value={name} type="text" id="Name" handleChange={(event) => setName(event.target.value)}/>
          <ControlledInput value={password} type="password" id="Password" handleChange={(event) => setPassword(event.target.value)}/>
          <ControlledInput value={education} type="text" id="Education" handleChange={(event) => setEducation(event.target.value)}/>
          <ControlledInput value={location} type="text" id="Location" handleChange={(event) => setLocation(event.target.value)}/>
          <Label>Skills Required</Label>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Skill 1</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={skills[0]}
              onChange={(event) => {
                skills[0] = event.target.value;
                setSkills(skills);
              }}
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
              value={skills[1]}
              onChange={(event) => {
                skills[1] = event.target.value;
                setSkills(skills);
              }}
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
              value={skills[2]}
              onChange={(event) => {
                skills[2] = event.target.value;
                setSkills(skills);
              }}
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
        <Button onClick={() => updateProfile()}>Save</Button>
      </ModalContent>
    </ModalContainer>
  )
}