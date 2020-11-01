import React from 'react';
import styled from "styled-components";

const PersonalDetails = styled.div`
`;

const CompanyName = styled.p`
  font-weight: bold;
`;

const ExperienceText = styled.p`
  font-style: italic;
`;

const AppliedContainer = styled.div`
`;

const AppliedText = styled.p`
  
`;

const AppliedJob = styled.p`
  font-style: italic;
`;

const MatchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 83%;
  padding: 1vw;
  margin: -0.5vw;
  position: relative;

  &:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #b6d1cf;
    height: 0.1vw;
  };
`;

export default function ExperienceRow(props) {
  return (
    <MatchContainer>
      <PersonalDetails>
        <CompanyName>
          CSESOC
        </CompanyName>
        <ExperienceText>
          2020 ARC Delegate
        </ExperienceText>
      </PersonalDetails>
      <AppliedContainer>
        <AppliedText>
          Oct 2020 - Present
        </AppliedText>
        <AppliedJob>
          Sydney, Australia
        </AppliedJob>
      </AppliedContainer>
    </MatchContainer>
  )
}