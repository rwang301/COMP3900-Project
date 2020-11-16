import React from 'react';
import styled from "styled-components";
import BusinessIcon from '@material-ui/icons/Business';
import ApplicationDetail from './ApplicationDetail';

const Avatar = styled(BusinessIcon)`
  flex: 1;
`;

const JobDescription = styled.div`
  flex: 2;
`;

const CompanyName = styled.p`
  font-weight: bold;
`;

const JobName = styled.p`
  font-style: italic;
`;

const AppliedContainer = styled.div`
  flex: 2;
`

const SkillsReqText = styled.p`
    font-style: italic;
`;

const SkillsText = styled.p`
  /* font-size: 3vw; */
  /* text-decoration: underline; */
`;

const MatchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 3px solid white;
  border-radius: 5px;
  margin: 5px;
  width: 100%;
  cursor: pointer;
`;


export default function JobseekerMatchRow({ info, skills }) {
  const [showDetails, setShowDetails] = React.useState(false);
  console.log(info, skills)
  return (
    <MatchContainer onClick={() => setShowDetails(true)}>
      <Avatar fontSize="large"/>
      <JobDescription>
        <CompanyName>
          {info.company}
        </CompanyName>
        <JobName>
          {info.job_title}
        </JobName>
      </JobDescription>
      <AppliedContainer>
        <SkillsReqText>
          Skills Required: 
        </SkillsReqText>
        <SkillsText>
          {skills.filter((skill) => skill !== 'null' && skill !== '').join(", ")}
        </SkillsText>
      </AppliedContainer>
      {showDetails && <ApplicationDetail setShow={setShowDetails} info={info} skills={skills} />}
    </MatchContainer>
  )
}