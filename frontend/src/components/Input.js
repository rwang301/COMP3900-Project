import React from 'react';
import styled from "styled-components";

export default function Input(props) {
  const Label = styled.label`
    display: block;
  `;
  const Input = styled.input`
   
  `;
  return <>
    <Label for={props.label}>{props.label}</Label>
    <Input id={props.label}/>
  </>
}