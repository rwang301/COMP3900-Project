import React from 'react';
import { TitleText, AppTable, HeaderRow, HeaderText, DataRow, DataText, SendButton, RejectButton, JobseekerHeadings, ButtonsContainer } from '../components/AppsTable'

export default function JobseekerApps() {
  return (
    <>
      <TitleText>Status of Applications</TitleText>
      <AppTable>
        <col width="25vw" />
        <col width="30vw" />
        <col width="15vw" />
        <col width="15vw" />
        <col width="15vw" />
        <tbody>
          <HeaderRow>
            {JobseekerHeadings.map((header, idx) => <HeaderText key={idx}>{header}</HeaderText>)}
          </HeaderRow>
          <DataRow>
            <DataText>googlehr@gmail.com</DataText>
            <DataText>Software Engineer at Google</DataText>
            <DataText>Interview</DataText>
            <DataText>
              <ButtonsContainer>
                <SendButton>
                  Accept
                </SendButton>
                &nbsp;
                <RejectButton>
                  Unmatch
                </RejectButton>
              </ButtonsContainer>
            </DataText>
            <DataText>Requested</DataText>
          </DataRow>
          <DataRow>
            <DataText>atlassianhr@atlassian.com</DataText>
            <DataText>Front End Engineer at Atlassian</DataText>
            <DataText>Job Offer</DataText>
            <DataText>
              <ButtonsContainer>
                <SendButton>
                  Accept
                </SendButton>
                &nbsp;
                <RejectButton>
                  Unmatch
                </RejectButton>
              </ButtonsContainer>
            </DataText>
            <DataText>Requested</DataText>
          </DataRow>
          <DataRow>
            <DataText>deloitteHR@deloitte.com</DataText>
            <DataText>Vacationer Program at Deloitte</DataText>
            <DataText>-</DataText>
            <DataText>
              <ButtonsContainer>
                {/* <SendButton>
                  Accept
                </SendButton>
                &nbsp; */}
                <RejectButton>
                  Unmatch
                </RejectButton>
              </ButtonsContainer>
            </DataText>
            <DataText>Under Review</DataText>
          </DataRow>
          <DataRow>
            <DataText>quantiumhr@quantium.com</DataText>
            <DataText>Summer Internship Program at Quantium</DataText>
            <DataText>Documentation</DataText>
            <DataText>
              <ButtonsContainer>
                {/* <SendButton>
                  Accept
                </SendButton>
                &nbsp; */}
                <RejectButton>
                  Unmatch
                </RejectButton>
              </ButtonsContainer>
            </DataText>
            <DataText>Under Review</DataText>
          </DataRow>
        </tbody>
      </AppTable>
    </>
  )
}