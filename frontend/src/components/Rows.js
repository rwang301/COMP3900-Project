import React from 'react';
import styled from "styled-components";
import jobEdit from '../assets/jobEdit.svg';
import remove from '../assets/remove.svg';

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 80%;
`;

const JobText = styled.p`
  font-size: 1.25vw;
`;

const JobName = styled(JobText)`
  flex: 2;
  cursor: pointer;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex: 1;
`;

const Icon = styled.img`
  height: 1.5vw;
  width: 1.5vw;
  margin: 1vw;
`;

const IconAndText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const JobEditIcon = styled(Icon)`

`;

const IconText = styled(JobText)`
  margin-left: -0.5vw;
  font-style: italic;
`;

export function ListedJobRow({jobTitle}) {
  return (
    <RowContainer>
      <JobName>
        {jobTitle}
      </JobName>
      <Actions>
        <IconAndText>
          <JobEditIcon src={jobEdit}/>
          <IconText>Edit</IconText>
        </IconAndText>
        <IconAndText>
          <JobEditIcon src={remove}/>
          <IconText>Remove</IconText>
        </IconAndText>
      </Actions>
    </RowContainer>
  )
};

export function SkillsRow({jobTitle}) {
  return (
    <RowContainer>
      <JobName>
        {jobTitle}
      </JobName>
      <Actions>
        <IconAndText>
          <JobEditIcon src={jobEdit}/>
          <IconText>Edit</IconText>
        </IconAndText>
        <IconAndText>
          <JobEditIcon src={remove}/>
          <IconText>Remove</IconText>
        </IconAndText>
      </Actions>
    </RowContainer>
  )
};
