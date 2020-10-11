import React from "react";
import styled from "styled-components";

const OuterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerContainerEmployer = styled(InnerContainer)`
  flex: 4;
`;

const InnerContainerJobSeeker = styled(InnerContainer)`
  flex: 5;
`;

const Label = styled.label`
  font-size: 2.5vmin;
  @media (max-width: 750px) {
    font-size: 2vmin;
  }
  @media (max-width: 500px) {
    font-size: 1.5vmin;
  }
`;

export default function Radios({value, onChangeHandler}) {
  return (
    <OuterContainer>
      <InnerContainerEmployer>
        <input type="radio" id="employer" name="role" checked={value} onChange={onChangeHandler} />
        &nbsp;
        <Label htmlFor="employer">I'm an Employer</Label>
      </InnerContainerEmployer>
      <InnerContainerJobSeeker>
        <input type="radio" id="seeker" name="role" checked={!value} onChange={onChangeHandler} />
        &nbsp;
        <Label htmlFor="seeker">I'm looking for a job</Label>
      </InnerContainerJobSeeker>
    </OuterContainer>
  )
}