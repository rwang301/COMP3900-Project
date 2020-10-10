import React from 'react';
import styled from 'styled-components';
import Button from './Button';

export default function Main(props) {
  const Main = styled.main`
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    & > h1, h2 {
      margin: 0;
    }

    & > h1 {
      font-size: 10vmin;
    }

    & > h2 {
      font-size: 4vmin;
    }
  `;

  const Section = styled.section`
    width: 45vmin;
    display: flex;
    justify-content: space-between;
  `;

  return (
    <Main>
      <h1>Recruit Assistant</h1>
      <h2>Find your dream job today. Without the hassle.</h2>
      <Section id="button-container">
        <Button onClick={props.setRegister}>Register</Button>
        <Button onClick={props.setLogin}>Login</Button>
      </Section>
    </Main>
  )
}