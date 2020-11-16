import styled, { css } from "styled-components";

const TitleText = styled.p`
  font-size: 2vw;
  font-weight: bold;
`;
const AppTable = styled.table`
  border: 1px solid white;
  width: 100%;
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
  justify-content: center;
  /* justify-content: space-between; */
`;

const DefaultButton = css`
  border: 1px solid white;
  border-radius: 3px;
  height: 2vw;
  width: 6vw;
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

const ProceedButton = styled.button`
  background-color: #a2d8fa;
  ${DefaultButton};
`;

const RejectButton = styled.button`
  background-color: #fa8987;
  ${DefaultButton};
`;

const EmployerHeadings = ['Applicant', 'Application', 'Stage', 'Action', 'Status']
const JobseekerHeadings = ['Recruiter', 'Application', 'Stage', 'Action', 'Status']

export { TitleText, AppTable, HeaderRow, HeaderText, DataRow, DataText, ButtonsContainer, DefaultButton, SendButton, ProceedButton, RejectButton, EmployerHeadings, JobseekerHeadings };