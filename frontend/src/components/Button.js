import React from 'react';
import styled from "styled-components";

export default function Button(props) {
  const PrimaryButton = styled.button`
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
  `
  return <PrimaryButton onClick={props.onClick}>{props.children}</PrimaryButton>
}
