import React from 'react';
import styled from "styled-components";
import MatchRow from './MatchRow'

const MatchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5vh 3vh 5vh;
  /* border: 5px solid white; */
  border-radius: 3px;
  width: 75%;
`;

const TitleText = styled.p`
  font-size: 2vw;
  font-weight: bold;
`

export default function NewMatches() {
  return (
    <MatchesContainer>
      <TitleText>New Matches</TitleText>
      <MatchRow/>
      <MatchRow/>
      <MatchRow/>
      <MatchRow/>
    </MatchesContainer>
  )
}