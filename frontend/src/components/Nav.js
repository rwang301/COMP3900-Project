import React from 'react';
import styled, { css, keyframes } from "styled-components";
import logo from '../assets/logo.svg';
import { useLocation } from 'react-router-dom';
import NavDropdown from './NavDropdown';

const Header = styled.header`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: whitesmoke;
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
  flex: 1;
  height: 20vmin;
  width: 20vmin;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} infinite 20s linear;
  }
`;

const Section = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex: 3;
`;

const border = css`
  border-radius: 5px;
  padding: 0 2vw;
`;

const Paragraph = styled.p`
  font-size: 2vw;
  visibility: ${props => props.login || props.visible ? 'unset' : 'hidden'};
`;

const Active = styled(Paragraph)`
  color: aqua;
  font-weight: bold;
`;

export default function Nav({login, logout}) {
  const location = useLocation();
  const tabs = (
    <>
      <Active login={login}>Home</Active>
      <Paragraph login={login}>My Matches</Paragraph>
      {location.pathname.slice(1) === 'employer' ? <Paragraph login={login}>Recruit Now</Paragraph> : <Paragraph login={login}>Apply Now</Paragraph>}
      <NavDropdown login={login} logout={logout}/>
    </>
  );

  return (
    <Header>
      <Img src={logo} alt="logo" />
      <Section>
        {tabs}
      </Section>
    </Header>
  )
}