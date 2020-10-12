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

const AppliedText = styled.p`
  /* font-size: 3vw; */
  flex: 2;
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
  return <MatchContainer>
    <Avatar fontSize="large"/>
    <PersonalDetails>
      <FullNameText>
        Kaiqi Liang
      </FullNameText>
      <ExperienceText>
        Software Developer at Google
      </ExperienceText>
    </PersonalDetails>
    <AppliedText>
      Applied to your: Software Developer at Apple
    </AppliedText>
  </MatchContainer>

}