import React from 'react';
import styled from "styled-components";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Avatar = styled(AccountCircleIcon)`
  flex: 1;
`;

const PersonalDetails = styled.div`
  flex: 2;
`;

const FullNameText = styled.p`
  font-weight: bold;
`;

const ExperienceText = styled.p`
  font-style: italic;
`;

const AppliedContainer = styled.div`
  flex: 2;
`

const AppliedText = styled.p`
  
`;

const AppliedJob = styled.p`
  /* font-size: 3vw; */
  text-decoration: underline;
`;

const MatchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 3px solid white;
  border-radius: 5px;
  margin: 5px;
  width: 100%;
`;


export default function MatchRow(props) {
  return (
    <MatchContainer>
      <Avatar fontSize="large"/>
      <PersonalDetails>
        <FullNameText>
          Kaiqi Liang
        </FullNameText>
        <ExperienceText>
          Software Developer at Google
        </ExperienceText>
      </PersonalDetails>
      <AppliedContainer>
        <AppliedText>
          Applied to your listing: 
        </AppliedText>
        <AppliedJob>
          Software Developer at Apple
        </AppliedJob>
      </AppliedContainer>
    </MatchContainer>
  )
}