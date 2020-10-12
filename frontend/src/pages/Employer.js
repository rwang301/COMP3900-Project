import React from 'react';
import NewMatches from '../components/NewMatches'
import styled from "styled-components";


const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5vh;
`;

export default function Employer() {
  return (
    <PageContainer>
    <NewMatches/>
    </PageContainer>
  )
}