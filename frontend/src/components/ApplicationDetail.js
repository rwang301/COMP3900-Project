import React from 'react';
import styled from "styled-components";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountCircleBig from '../assets/accountCircleBig.svg';

const ModalContainer = styled.div`
  display: ${props => props.toShow ? 'block' : 'none'};
  cursor: auto;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-top: 10vw;
  background-color: rgba(0,0,0,0.2);
`;

const ModalContent = styled.div`
  background-color: #d4fafa;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 5px;
  width: 50%;
  color: black;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  align-items: center;
`;

const ProfilePic = styled.img`
  flex: 1;
  height: 10vw;
  width: 10vw;
`;

const FullNameText = styled.p`
  font-weight: bold;
  font-size: 2vw;
`;

const AppliedContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const AppliedText = styled.p`
  margin-right: 0.5vw;
`;

const AppliedJob = styled.p`
  /* font-size: 3vw; */
  text-decoration: underline;
  cursor: pointer;
`;


export default function ApplicationDetail({toShow}) {
  return (
    <ModalContainer toShow={toShow}>
      <ModalContent>
        <ProfileHeader>
          <ProfilePic src={AccountCircleBig}/>
          <HeaderText>
            <FullNameText>Kaiqi Liang</FullNameText>
            <AppliedContainer>
              <AppliedText>Applied to your listing:</AppliedText>
              <AppliedJob>Software Developer at Apple</AppliedJob>
            </AppliedContainer>
          </HeaderText>
        </ProfileHeader>
      </ModalContent>
    </ModalContainer>
  )
}