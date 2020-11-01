import React from 'react';
import styled from "styled-components";
import skills_icon from '../assets/skills.svg'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const SkillsIcon = styled.img`
  height: 1.5vw;
  width: 1.5vw;
`;

const SkillText = styled.p`
  margin-left: 0.5vw;
  font-size: 1vw;
`;

export default function SkillPoint({skill}) {
  return (
    <Wrapper>
      <SkillsIcon src={skills_icon}/>
      <SkillText>{skill}</SkillText>
    </Wrapper>
  )
}