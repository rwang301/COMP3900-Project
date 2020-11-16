import React from 'react';
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