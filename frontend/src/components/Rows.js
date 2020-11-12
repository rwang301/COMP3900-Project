import React from 'react';
import styled from "styled-components";
import jobEdit from '../assets/jobEdit.svg';
import remove from '../assets/remove.svg';
import JobDetail from './JobDetail';
import { StoreContext } from '../utils/store';

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

export function ListedJobRow({job}) {
  const { api } = React.useContext(StoreContext);
  const [jobDetailModal, setJobDetailModal] = React.useState(false);
  const removeJob = async (id) => {
    const response = await api.fetch('job', 'delete', { id });
    if (response) {
      console.log(response);
    };
  };
  return (
    <RowContainer>
      <JobName>
        {job.job_title}
      </JobName>
      <Actions>
        <IconAndText
          onClick={() => {
            setJobDetailModal(true)
          }}
        >
          <JobEditIcon src={jobEdit}/>
          <IconText>Edit</IconText>
        </IconAndText>
        <IconAndText onClick={() => removeJob(job.id)}>
          <JobEditIcon src={remove}/>
          <IconText>Remove</IconText>
        </IconAndText>
      </Actions>
      {jobDetailModal && <JobDetail setShow={setJobDetailModal} job={job} />}
    </RowContainer>
  )
};

export function SkillsRow({skillName}) {
  const removeSkill = () => {
    //TO DO - make fetch to remove
    console.log('dummy remove')
  };

  return (
    <RowContainer>
      <JobName>
        {skillName}
      </JobName>
      <Actions>
        {/* <IconAndText>
          <JobEditIcon src={jobEdit}/>
          <IconText>Edit</IconText>
        </IconAndText> */}
        <IconAndText onClick={removeSkill}>
          <JobEditIcon src={remove}/>
          <IconText>Remove</IconText>
        </IconAndText>
      </Actions>
    </RowContainer>
  )
};
