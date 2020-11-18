import React from 'react'
import styled from "styled-components";
import { GoogleLogin } from 'react-google-login';
import GoogleRegisterModal from './GoogleRegisterModal';
import { isEmailValid } from '../components/Form';
import { API_URL } from '../utils/api';
import { StoreContext } from '../utils/store';
import { useHistory } from 'react-router-dom';

const CLIENT_ID = '836356102465-7majqspmjajgqhpoevi5mlmu8mdkmbsh.apps.googleusercontent.com';

const GoogleButton = styled(GoogleLogin)`
  max-width: 20vmin;
  width: 20vmin;
  height: 8vmin;
  border-radius: 5px !important;
  background: whitesmoke !important;
  color: black !important;
  border: 3px solid darkcyan !important;

  &:hover {
    font-weight: bold !important;
    background: black !important;
    color: whitesmoke !important;
    border: 1px solid whitesmoke !important;
  }
`;

export default function GoogleSignBtn(props) {
  const [openRegisterModal, setOpenRegisterModal] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const { setAlert, employer, setEmployer } = React.useContext(StoreContext);
  const history = useHistory();
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const register = async () => {
    if (!/^([A-Z][a-z]{1,} ){1,}[A-Z][a-z]{1,}$/.test(name)) {
      setAlert({ open: true, severity: 'warning', message: 'Please enter a valid name' });
    } else if (!isEmailValid(email)) {
      setAlert({ open: true, severity: 'warning', message: 'Please enter a valid email' });
    } else {
      const data = { name, email, password: '', employer };
      try {
        const response = await fetch(`${API_URL}/auth/register`, {
          ...options,
          body: JSON.stringify(data),
        });
        if (response.status === 200) {
          const json = await response.json();
          props.login(json.token);
          return employer ? 'employer' : 'jobseeker';
        } else if (response.status === 409) {
          setAlert({ open: true, severity: 'info', message: 'Email already exists' });
        } else {
          setAlert({ open: true, severity: 'error', message: 'Oops something went wrong' });
        }
      } catch (error) {
        setAlert({ open: true, severity: 'warning', message: error.message });
      }
    }
    return '';
  }

  const login = async (res) => {
    const { name, email } = res.profileObj;
    const data = { email, password: '' };
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        ...options,
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        const json = await response.json();
        props.login(json.token);
        setEmployer(json.employer);
        history.push(json.employer ? 'employer' : 'jobseeker');
      } else if (response.status === 403) {
        setEmail(email);
        setName(name);
        setOpenRegisterModal(true);
      }
    } catch (error) {
      setAlert({ open: true, severity: 'warning', message: error.message });
    }
  }

  const handleLoginFailure = (res) => {
    setAlert({ open: true, severity: 'warning', message: res.error });
  }

  return (
    <>
      <GoogleButton
          clientId={CLIENT_ID}
          buttonText='Login with Google'
          onSuccess={(res) => login(res)}
          onFailure={(res) => handleLoginFailure(res)}
          cookiePolicy={'single_host_origin'}
          responseType='code,token'
      />
      {openRegisterModal &&
        <GoogleRegisterModal
          closeModal={() => setOpenRegisterModal(false)}
          email={email} setEmail={(e) => setEmail(e.target.value)}
          name={name} setName={(e) => setName(e.target.value)}
          employer={employer} updateEmployer={() => setEmployer(!employer)}
          register={register}
        />
      }
    </>
  )
}

