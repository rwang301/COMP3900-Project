import React from 'react';
import styled from 'styled-components';
import { styled as withStyled } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import CreateIcon from '@material-ui/icons/Create';
import { StoreContext } from '../utils/store';
import fileToDataUrl from '../utils/file';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 50vmin;
`;

const Anchor = styled(Link)`
  font-size: 2vmin;
  margin-bottom: 2vmin;
  color: white;
`;

const ModalContainer = styled.div`
  display: block;
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
  background-color: #72afd6;
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
  margin-left: 48vw;
  cursor: pointer;
`;

function Href(props) {
  return (
    <Anchor to={props.route}>{props.children}</Anchor>
  )
}

const Header = styled.h1`
  font-size: 3em;
`;

const isEmailValid = (email) => {// eslint-disable-next-line
  const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  return pattern.test(email);
}

const ProfilePic = withStyled(Avatar)({
  height: '10vw',
  width: '10vw',
  maxWidth: '20vw',
});

const Edit = withStyled(CreateIcon)({
  cursor: 'pointer',
});

const AvatarContainer = styled.div`
  position: relative;
`;

const EditContainer = styled.div`
  border-radius: 50%;
  background: white;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  display: none;
`;

const EditAvatar = ({ profile, setProfile }) => {
  const { setAlert } = React.useContext(StoreContext);
  const uploadImage = async (event) => {
    try {
      const result = await fileToDataUrl(event.target.files[0]);
      setProfile(result);
    } catch (error) {
      setAlert({ open: true, severity: 'warning', message: error.message });
    }
  };
  return (
    <AvatarContainer>
      <ProfilePic src={profile} />
      <EditContainer>
        <label for="imageUpload">
          <Edit />
        </label>
        <Input id="imageUpload" type="file" accept="image/*" onChange={uploadImage} />
      </EditContainer>
    </AvatarContainer>
  );
};

const Skills = ({ label, value, onChange }) => {
  const { api } = React.useContext(StoreContext);
  const [skills, setSkills] = React.useState([]);
  React.useEffect(() => {
    const getSkills = async () => {
      const response = await api.fetch('skills');
      if (response) setSkills(response);
    };
    getSkills();
  }, []);
  return (
    <Autocomplete
      id="combo-box-demo"
      options={skills}
      value={value}
      onChange={(event) => onChange(event.target.innerText)}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
    />
  );
};

export { Main, Header, Form, Href, isEmailValid, ModalContainer, ModalContent, CloseButton, ProfilePic, EditAvatar, Skills };
