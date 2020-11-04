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

const Textarea = styled.textarea`
  font-size: 2vmin;
  padding: 1vmin;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 2vmin;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  height: ${(props) => props.large ? '100px' : 'unset'};
  overflow: ${(props) => props.large ? 'scroll' : 'unset'};
`;

export function ControlledInput({type, id, value, handleChange, large}) {
  return <>
    <Label type={type} htmlFor={id}>{id}</Label>
    {large ? <Textarea type={type} id={id} placeholder={id} value={value} large={large} onChange={handleChange}/> : <Input type={type} id={id} placeholder={id} value={value} large={large} onChange={handleChange}/>}
  </>
}

export function SeparatedInput({type, id, value, handleChange, large, curr_value}) {
  return <>
    <Label type={type} htmlFor={id}>{id}</Label>
    {large ? <Textarea type={type} id={curr_value} placeholder={curr_value} value={value} large={large} onChange={handleChange}/> : <Input type={type} id={curr_value} placeholder={curr_value} value={value} large={large} onChange={handleChange}/>}
  </>
}