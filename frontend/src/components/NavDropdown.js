import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import lock from '../assets/lock.svg';
import profile from '../assets/profile.svg';

const Div = styled.div`
  display: flex;
  align-items: center;
  cursor: ${props => props.login ? 'pointer' : 'unset'};
  
  & > p {
    color: ${props => props.login ? 'white' : 'red'};
    margin-right: 0.25vw;
  }

  & > img {
    height: 2vw;
    margin-right: 0.5vw;
  }
`;

const Paragraph = styled.p`
  font-size: 2vw;
  visibility: ${props => props.login || props.visible ? 'unset' : 'hidden'};
`;

const Dropdown = styled.div`
  width: 0; 
  height: 0; 
  border-left: 0.5vw solid transparent;
  border-right: 0.5vw solid transparent;
  border-top: 0.5vw solid white;
  display: ${props => props.login ? 'unset' : 'none'};
`;

export default function NavDropdown(props) {
  return (
    <>
      <Link style={{textDecoration: 'none'}} to='/'>
        <Div login={props.login} onClick={props.login ? props.logout : undefined}>
          <img src={props.login ? profile : lock} alt="Lock"></img>
          <Paragraph login={props.login} visible={true}>My Profile</Paragraph>
          &nbsp;
          <Dropdown login={props.login}/>
        </Div>

      </Link>
    </>
  )
}