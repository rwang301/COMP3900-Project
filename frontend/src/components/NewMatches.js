import React from 'react';
import styled from "styled-components";
import EmployerMatchRow from './EmployerMatchRow'

const MatchesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5vh 3vh 5vh;
  /* border: 5px solid white; */
  border-radius: 3px;
  width: 100%;
`;

const TitleText = styled.p`
  font-size: 2vw;
  font-weight: bold;
`

export default function NewMatches() {
  const [allData, setAllData] = React.useState([
    {"name": "Kaiqi Liang", "skills": ["Reactjs", "CSS", "SQL"], "jobApplied": "Software Developer at Apple"}, 
    {"name": "Richard Wang", "skills": ["C++", "AWS", "SQL"], "jobApplied": "Game Engineer at Riot Games"}, 
    {"name": "Tony Lu", "skills": ["Python", "Linear Regression", "Tableau"], "jobApplied": "Data Analyst at Quantium"}, 
    {"name": "William Huang", "skills": ["C++", "Mechatronics", "MIPS"], "jobApplied": "Robot Developer at Google"} 
  ]);
  return (
    <MatchesContainer>
      <TitleText>New Matches</TitleText>
      {allData.map((match, index) => <EmployerMatchRow key={index} name={match.name} skills={match.skills} jobApplied={match.jobApplied}/>)}
    </MatchesContainer>
  )
}