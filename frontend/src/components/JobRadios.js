import React from "react";
import styled from "styled-components";

const OuterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2vmin;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 1.5vmin;
  @media (max-width: 750px) {
    font-size: 1vmin;
  }
  @media (max-width: 500px) {
    font-size: 0.5vmin;
  }
`;

export default function JobRadios({value, onChangeHandler}) {
  return (
    <OuterContainer>
      <InnerContainer>
        <input type="radio" id="full-time" value="full-time" name="type" checked={value === "full-time"} onChange={onChangeHandler} />
        &nbsp;
        <Label htmlFor="employer">Full Time</Label>
      </InnerContainer>
      <InnerContainer>
        <input type="radio" id="part-time" value="part-time" name="type" checked={value === "part-time"} onChange={onChangeHandler} />
        &nbsp;
        <Label htmlFor="seeker">Part Time</Label>
      </InnerContainer>
      <InnerContainer>
        <input type="radio" id="casual" value="casual" name="type" checked={value === "casual"} onChange={onChangeHandler} />
        &nbsp;
        <Label htmlFor="casual">Casual</Label>
      </InnerContainer>
    </OuterContainer>
  )
}