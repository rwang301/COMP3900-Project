import React from 'react';
import styled from "styled-components";
import email from '../assets/email.svg'
import company from '../assets/company.svg'
import location from '../assets/location.svg'
import education from '../assets/education.svg'
import jobname from '../assets/jobname.svg'
import time from '../assets/time.svg'
import closingtime from '../assets/closingtime.svg'
import one from '../assets/one.svg'
import two from '../assets/two.svg'
import three from '../assets/three.svg'


const RowContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const RowIcon = styled.img`
  height: 2.5vw;
  width: 2.5vw;
  margin: 1vw;
`;

const RowText = styled.p`
  font-size: 1.25vw;
`;

export default function AboutRow({iconType, text}) {
  let icon = null;
  switch(iconType) {
    case 'email':
      icon = <RowIcon src={email}/>;
      break;
    case 'company':
      icon = <RowIcon src={company}/>;
      break;
    case 'jobname':
      icon = <RowIcon src={jobname}/>;
      break;
    case 'time':
      icon = <RowIcon src={time}/>;
      break;
    case 'location':
      icon = <RowIcon src={location}/>;
      break;
    case 'closingtime':
      icon = <RowIcon src={closingtime}/>;
      break;
    case 'education':
      icon = <RowIcon src={education}/>;
      break;
    case 'one':
      icon = <RowIcon src={one}/>;
      break;
    case 'two':
      icon = <RowIcon src={two}/>;
      break;
    case 'three':
      icon = <RowIcon src={three}/>;
      break;
    default:
      icon = null;
  }
  return (
    <RowContainer>
      {icon}
      <RowText>
        {text}
      </RowText>
    </RowContainer>
  )
}