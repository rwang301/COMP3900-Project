import React from 'react';
import styled from "styled-components";

const Label = styled.label`
  display: block;
  margin-bottom: 1vmin;
  font-size: 3vmin;
`;

const Input = styled.input`
  font-size: 2vmin;
  padding: 1vmin;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 2vmin;
`;

export default function ControlledInput({type, id, value, handleChange}) {
  return <>
    <Label type={type} htmlFor={id}>{id}</Label>
    <Input type={type} id={id} placeholder={id} value={value} onChange={handleChange}/>
  </>
}