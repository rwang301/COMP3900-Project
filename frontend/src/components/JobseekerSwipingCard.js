import React from 'react';
import styled from "styled-components";
import companyicon from '../assets/company.svg'
import AboutRow from './AboutRow';

const UserContainer = styled.div`
  border: 0.5vw white solid;
  border-radius: 3vw;
  padding: 1vw;
  width: 80%;
  margin: 5vw;
  display: flex;
  flex-direction: column;
  padding-left: 5vw;
`;

const UserHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserIcon = styled.img`
  height: 5vw;
  width: 5vw;
  margin: 1vw;
`;

const UserNames = styled.p`
  font-size: 3vw;
  margin-left: 0.5vw;
`;

const SubContainer = styled.div`
  margin-left: 1vw;
`;

const SubtitleText = styled.p`
  font-size: 2vw;
  text-decoration: underline;
`;

export default function JobseekerSwipingCard({company, job_title, employment_type, location, closing_date, skill1, skill2, skill3}) {

  return (
    <UserContainer>
      <UserHeader>
        <UserIcon src={companyicon}/>
        <UserNames>
          {company}
        </UserNames>
      </UserHeader>
      <SubContainer>
        <SubtitleText>
          Job Details
        </SubtitleText>
          <AboutRow iconType={"jobname"} text={job_title}/>
          <AboutRow iconType={"time"} text={employment_type}/>
          <AboutRow iconType={"location"} text={location}/>
          <AboutRow iconType={"closingtime"} text={closing_date}/>
      </SubContainer>
      <SubContainer>
        <SubtitleText>
            Skills Required
        </SubtitleText>
        <AboutRow iconType={"one"} text={(skill1 !== "null") && skill1}/>
        <AboutRow iconType={"two"} text={(skill2 !== "null") && skill2}/>
        <AboutRow iconType={"three"} text={(skill3 !== "null") && skill3}/>
      </SubContainer>
    </UserContainer>
  )
}