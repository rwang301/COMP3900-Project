import React from 'react';
import styled from 'styled-components';
import Buttons from './Buttons';

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

export default function Home(props) {
  return (
    <Main>
      <h1>Recruit Assistant</h1>
      <h2>Find your dream job today. Without the hassle.</h2>
      <Buttons
        onClickHandler1={props.setRegister}
        onClickHandler2={props.setLogin}
        innerText1="Register"
        innerText2="Login"
      />
    </Main>
  )
}