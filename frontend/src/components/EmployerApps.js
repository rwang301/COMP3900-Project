import React from 'react';
import { TitleText, AppTable, HeaderRow, HeaderText, DataRow, DataText, SendButton, RejectButton, EmployerHeadings, ButtonsContainer, ProceedButton } from '../components/AppsTable'

export default function EmployerApps() {
  return (
    <>
      <TitleText>Status of Applicants</TitleText>
      <AppTable>
        <col width="15vw" />
        <col width="30vw" />
        <col width="15vw" />
        <col width="15vw" />
        <col width="15vw" />
        <tbody>
          <HeaderRow>
            {EmployerHeadings.map((header, idx) => <HeaderText key={idx}>{header}</HeaderText>)}
          </HeaderRow>
          <DataRow>
            <DataText>Kaiqi Liang</DataText>
            <DataText>Software Engineer Google</DataText>
            <DataText>Documentation</DataText>
            <DataText>
              <ButtonsContainer>
                <ProceedButton>
                  Proceed
                </ProceedButton>
                &nbsp;
                <RejectButton>
                  Unmatch
                </RejectButton>
              </ButtonsContainer>
            </DataText>
            <DataText>Received (attachment)</DataText>
          </DataRow>
          <DataRow>
            <DataText>Richard Wang</DataText>
            <DataText>Atlassian Front End Engineer</DataText>
            <DataText>Job Offer</DataText>
            <DataText>
              <ButtonsContainer>
                {/* <SendButton>
                  Request
                </SendButton>
                &nbsp; */}
                <RejectButton>
                  Unmatch
                </RejectButton>
              </ButtonsContainer>
            </DataText>
            <DataText>Sent</DataText>
          </DataRow>
          <DataRow>
            <DataText>William Huang</DataText>
            <DataText>Deloitte Vacationer Program</DataText>
            <DataText>Interview</DataText>
            <DataText>
              <ButtonsContainer>
                {/* <SendButton>
                  Request
                </SendButton>
                &nbsp; */}
                <RejectButton>
                  Unmatch
                </RejectButton>
              </ButtonsContainer>
            </DataText>
            <DataText>Sent</DataText>
          </DataRow>
          <DataRow>
            <DataText>Tony Lu</DataText>
            <DataText>Quantium Summer Internship Program</DataText>
            <DataText>Documentation</DataText>
            <DataText>
              <ButtonsContainer>
                <SendButton>
                  Request
                </SendButton>
                &nbsp;
                <RejectButton>
                  Unmatch
                </RejectButton>
              </ButtonsContainer>
            </DataText>
            <DataText>Action Required</DataText>
          </DataRow>
        </tbody>
      </AppTable>
    </>
  )
}