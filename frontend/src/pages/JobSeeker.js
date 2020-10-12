import React from 'react';
import NewMatches from '../components/NewMatches'
import AppsTable from '../components/AppsTable'
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2vh;
`;

export default function JobSeeker() {
  return (
    <PageContainer>
      <NewMatches/>
      <AppsTable/>
    </PageContainer>
  )
}