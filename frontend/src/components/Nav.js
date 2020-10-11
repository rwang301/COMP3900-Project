import React from 'react';
import styled, { keyframes } from "styled-components";
import logo from '../assets/logo.svg';
import lock from '../assets/lock.svg';
import profile from '../assets/profile.svg';
import { useLocation } from 'react-router-dom';

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

export default function Nav(props) {
  const Div = styled.div`
    display: flex;
    align-items: center;

    & > p {
      color: ${props.login ? 'skyblue' : 'red'};
      font-weight: bold;
    }

    & > img {
      height: 3vw;
    }
  `;

  const Paragraph = styled.p`
    font-size: 2vw;
    visibility: ${props.login ? 'unset' : 'hidden'};
  `;

  const Active = styled(Paragraph)`
    border: 2px solid aqua;
    border-radius: 5px;
    padding: 0 10px 3px 10px;
  `;

  const location = useLocation();
  const tabs = (
    <>
      <Active>Home</Active>
      <Paragraph>My Matches</Paragraph>
      {location.pathname.slice(1) === 'employer' ? <Paragraph>Recruit Now</Paragraph> : <Paragraph>Apply Now</Paragraph>}
    </>
  );

  return (
    <Header>
      <Img src={logo} alt="logo" />
      <Section>
        {tabs}
        <Div>
          <Paragraph style={{visibility: 'visible'}}>My Profile</Paragraph>
          &nbsp;
          <img src={props.login ? profile : lock} alt="Lock"></img>
        </Div>
      </Section>
    </Header>
  )
}