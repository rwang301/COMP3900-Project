import React from 'react';
import styled from "styled-components";

const Section = styled.section`
  width: 50vmin;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  max-width: 20vmin;
  width: 20vmin;
  height: 8vmin;
  font-size: 3vmin;
  border-radius: 5px;
  background: whitesmoke;
  color: black;
  border: 3px solid darkcyan;

  &:hover {
    font-weight: bold;
    background: black;
    color: whitesmoke;
    border: 1px solid whitesmoke;
  }
`;

export default function Buttons(props) {
    return (
      <Section>
        <Button onClick={props.onClickHandler1}>{props.innerText1}</Button>
        <Button onClick={props.onClickHandler2}>{props.innerText2}</Button>
      </Section>
    )
}