import React from 'react';
import styled, { keyframes } from "styled-components";
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { StoreContext } from '../utils/store';
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

const Paragraph = styled.p`
  font-size: 2vw;
  visibility: ${props => props.login || props.visible ? 'unset' : 'hidden'};
  cursor: pointer;
`;

const PlainLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

export default function Nav({login, logout}) {
  const { employer } = React.useContext(StoreContext);
  const { pathname } = useLocation();
  const tabs = (
    <>
      <PlainLink to='/jobseeker'>
        <Paragraph className={(pathname === '/jobseeker' || pathname === '/employer') && 'active'} login={login}>Dashboard</Paragraph>
      </PlainLink>
      <PlainLink to='/matches'>
        <Paragraph className={(pathname === '/matches') && 'active'} login={login}>My Matches</Paragraph>
      </PlainLink>
      <PlainLink to='/swiping'>
        <Paragraph className={(pathname === '/swiping') && 'active'} login={login}>{employer ? 'Recruit Now' : 'Apply Now'}</Paragraph>
      </PlainLink>
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