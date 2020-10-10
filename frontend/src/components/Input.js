import React from 'react';
import styled from "styled-components";

export default function Input(props) {
  const Label = styled.label`
    display: block;
    margin-bottom: 1vmin;
  `;
  const Input = styled.input`
    height: 3vmin;
    width: 35%;
  `;
  return <>
    <Label for={props.id} type={props.type}>{props.id} </Label>
    <Input id={props.id} type={props.type} />
  </>
}