import React from 'react';
import styled, { css } from "styled-components";

const TitleText = styled.p`
  font-size: 2vw;
  font-weight: bold;
`;
const AppTable = styled.table`
  border: 1px solid white;
  width: 75%;
  table-layout: fixed;
`;

const HeaderRow = styled.tr`
  height: 2vw;
`;

const HeaderText = styled.th`
  font-size: 1.2vw;
`;

const DataRow = styled.tr`
`;

const DataText = styled.td`
  font-size: 1vw;
  text-align: center;
  overflow: hidden;
  border-top: 0.01vw solid white;
  padding: 1vw;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const DefaultButton = css`
  border: 1px solid white;
  border-radius: 3px;
  height: 3vh;
  width: 8vh;
  font-size: 0.8vw;
  font-weight: bold;

  &:hover {
    font-weight: bold;
    background: black;
    color: whitesmoke;
    border: 1px solid whitesmoke;
  }
`;

const SendButton = styled.button`
  background-color: #87fa98;
  ${DefaultButton};
`;

const RejectButton = styled.button`
  background-color: #fa8987;
  ${DefaultButton};
`;

const Headers = ['Applicant', 'Application', 'Stage', 'Action']

export default function AppsTable({employer}) {
  return (
    <>
      <TitleText>{`Status of ${employer ? 'Applicants' : 'Applications'}`} </TitleText>
      <AppTable>
        <col width="25vw" />
        <col width="45vw" />
        <col width="15vw" />
        <col width="15vw" />
        <tbody>
          <HeaderRow>
            {Headers.map((header, idx) => <HeaderText key={idx}>{header}</HeaderText>)}
          </HeaderRow>
          <DataRow>
            <DataText>Kaiqi Liang</DataText>
            <DataText>Software Engineer Google</DataText>
            <DataText>Interview</DataText>
            <DataText>
              <ButtonsContainer>
                <SendButton>
                  {employer ? 'Send' : 'Accept'}
                </SendButton>
                &nbsp;
                <RejectButton>
                  {employer ? 'Reject' : 'Decline'}
                </RejectButton>
              </ButtonsContainer>
            </DataText>
          </DataRow>
          <DataRow>
            <DataText>Richard Wang</DataText>
            <DataText>Atlassian Front End Engineer</DataText>
            <DataText>Job Offer</DataText>
            <DataText>Sent</DataText>
          </DataRow>
          <DataRow>
            <DataText>William Huang</DataText>
            <DataText>Deloitte Vacationer Program</DataText>
            <DataText>Interview</DataText>
            <DataText>Accepted</DataText>
          </DataRow>
          <DataRow>
            <DataText>Tony Lu</DataText>
            <DataText>Quantium Summer Internship Program</DataText>
            <DataText>Job Offer</DataText>
            <DataText>Declined</DataText>
          </DataRow>
        </tbody>
      </AppTable>
    </>
  )
}