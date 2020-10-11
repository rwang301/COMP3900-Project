import React from 'react';
import styled, { keyframes } from "styled-components";
import logo from '../assets/logo.svg';
import lock from '../assets/lock.svg';
import profile from '../assets/profile.svg';

const Header = styled.header`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: whitesmoke;

`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  font-size: calc(10px + 2vmin);
  align-items: center;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Img = styled.img`
  height: 20vmin;
  width: 20vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} infinite 20s linear;
  }
`;

function LoggedinNav(props) {
  const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > p {
    color: skyblue;
    font-weight: bold;
    font-size: 3vmin;
  }

  & > img {
    height: 3.5vmin;
    padding-left: 0.5vmin;
  }
`;
  return (
    <Header>
      <Img src={logo} alt="logo" />
      <NavContainer>
        <p>Home</p>
        <p>My Matches</p>
        {props.currState == 'employer' ? <p>Recruit Now</p> : <p>Apply Now</p>}
        <Section id="profile">
          <p>My Profile</p>
          &nbsp;
          {/* <img src={props.login ? profile : lock} alt="Lock"></img> */}
          <img src={profile} alt="Profile"></img>
        </Section>
      </NavContainer>
    </Header>
  )
  
}

function GuestNav(props) {
  const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > p {
    color: red;
    font-weight: bold;
    font-size: 3vmin;
  }

  & > img {
    height: 3.5vmin;
    padding-left: 0.5vmin;
  }
`;
  return (
    <Header>
      <Img src={logo} alt="logo" />
        <Section id="profile">
          <p>My Profile</p>
          &nbsp;
          <img src={lock} alt="Lock"></img>
        </Section>
    </Header>
  )
  
}

export default function Nav(props) {
  const Section = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > p {
      color: ${props.login ? 'skyblue' : 'red'};
      font-weight: bold;
      font-size: 3vmin;
    }

    & > img {
      height: 3.5vmin;
      padding-left: 0.5vmin;
    }
  `;
  if (props.currState == 'employer' || props.currState == 'jobSeeker') return (<LoggedinNav currState={props.currState}/>);
  else return <GuestNav/>


}