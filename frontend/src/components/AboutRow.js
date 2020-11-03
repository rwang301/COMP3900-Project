import React from 'react';
import styled from "styled-components";
import email from '../assets/email.svg'
import company from '../assets/company.svg'
import location from '../assets/location.svg'
import education from '../assets/education.svg'


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
    case 'location':
      icon = <RowIcon src={location}/>;
      break;
    case 'education':
      icon = <RowIcon src={education}/>;
      break;
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