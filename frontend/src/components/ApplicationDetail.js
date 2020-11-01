import React from 'react';
import styled from "styled-components";
import ExperienceRow from './ExperienceRow';
import kai_dp from '../assets/kai_dp.jpg'
import SkillPoint from './SkillPoint';
import CloseIcon from '@material-ui/icons/Close';

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
  padding-top: 2vw;
  background-color: rgba(0,0,0,0.2);
`;

const ModalContent = styled.div`
  background-color: #d4fafa;
  margin: auto;
  padding: 1.5vw;
  border: 1px solid #888;
  border-radius: 2vw;
  width: 50%;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled(CloseIcon)`
  position: absolute;
  margin-left: 48vw;
  cursor: pointer;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50vw;
`;

const ProfilePic = styled.img`
  height: 10vw;
  width: 10vw;
  max-width: 20vw;
`;

const KaiPic = styled(ProfilePic)`
  border-radius: 10vw;
`;

const FullNameText = styled.p`
  font-weight: bold;
  font-size: 2vw;
`;

const AppliedContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.25vw;
  font-style: italic;
`;

const AppliedText = styled.p`
  margin-right: 0.5vw;
  
`;

const AppliedJob = styled.p`
  text-decoration: underline;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ExperienceContainer = styled(Container)`
`; 
const SkillsContainer = styled.div`
`;

const ExperienceHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-bottom: -1vw;
`;

const Subtitle = styled.p`
  font-size: 2vw;
  font-weight: bold;
`;

const ExperienceSubtitle = styled(Subtitle)`
  margin-right: 5.5vw;
`;

const SkillsSubtitle = styled(Subtitle)`
  margin-right: 39vw;
  margin-bottom: 1vw;
`;

const Attachments = styled.div`
  margin-left: 5vw;
`;

const Button = styled.button`
  width: 13vmin;
  height: 5vmin;
  font-size: 1.5vmin;
  border-radius: 5px;
  background: whitesmoke;
  color: black;
  border: 3px solid darkcyan;
  margin: 0.75vw;

  &:hover {
    font-weight: bold;
    background: black;
    color: whitesmoke;
    border: 1px solid whitesmoke;
  }
`;

const PointsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 7.5vw;
`;

const PointsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ButtonsContainer = styled.div`
`;

const OfferButton = styled(Button)`
  width: 15vmin;
  background-color: #87fa98;
  margin-right: 3vw;
`;
const DeclineButton = styled(Button)`
  width: 15vmin;
  background-color: #fa8987;
  margin-left: 3vw;
`;

export default function ApplicationDetail({toShow, setShow}) {
  return (
    <ModalContainer toShow={toShow}>
      <ModalContent>
        <CloseButton onClick={(e) => {
            e.stopPropagation();
            setShow(false);
        }}/>
        <ProfileHeader>
          {/* <ProfilePic src={AccountCircleBig}/> */}
          <KaiPic src={kai_dp}/>
          <HeaderText>
            <FullNameText>Kaiqi Liang</FullNameText>
            <AppliedContainer>
              <AppliedText>Applied to your listing:</AppliedText>
              <AppliedJob>Software Developer at Apple</AppliedJob>
            </AppliedContainer>
          </HeaderText>
        </ProfileHeader>
        <ExperienceContainer>
          <ExperienceHeader>
            <ExperienceSubtitle>
              Experience
            </ExperienceSubtitle>
            <Attachments>
              <Button>
                Resume
              </Button>
              <Button>
                Cover Letter
              </Button>
            </Attachments>
          </ExperienceHeader>
          <ExperienceRow/>
          <ExperienceRow/>
          <ExperienceRow/>
        </ExperienceContainer>
        <SkillsContainer>
          <SkillsSubtitle>
            Skills
          </SkillsSubtitle>
          <PointsContainer>
            <PointsRow>
              <SkillPoint skill={"Scummaster skills"}/>
              <SkillPoint skill={"Python"}/>
            </PointsRow>
            <PointsRow>
              <SkillPoint skill={"Reactjs"}/>
              <SkillPoint skill={"C Programming"}/>
            </PointsRow>
          </PointsContainer>
        </SkillsContainer>
        <ButtonsContainer>
          <OfferButton>Offer Interview</OfferButton>
          <DeclineButton>Decline Applicant</DeclineButton>
        </ButtonsContainer>
      </ModalContent>
    </ModalContainer>
  )
}