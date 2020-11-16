import React from 'react';
import NewMatches from '../components/NewMatches'
import styled from "styled-components";
import EmployerApps from '../components/EmployerApps';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2vh;
`;

export default function Employer() {
  return (
    <PageContainer>
      {/* <NewMatches /> */}
      <EmployerApps />
    </PageContainer>
  )
}