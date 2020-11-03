import React from 'react';
import styled from "styled-components";
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';
import tick from '../assets/tick.svg';
import cancel from '../assets/cancel.svg';
import swipeProfile from '../assets/swipeProfile.svg';
import AboutRow from '../components/AboutRow';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SwipingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const ArrowIcon = styled.img`
  height: 5vw;
  width: 5vw;
  margin: 1vw;
  cursor: pointer;
`;

const UserContainer = styled.div`
  border: 0.5vw white solid;
  border-radius: 3vw;
  padding: 1vw;
  width: 80%;
  margin: 5vw;
  display: flex;
  flex-direction: column;
  padding-left: 5vw;
`;

const UserHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
`;

const UserIcon = styled.img`
  height: 5vw;
  width: 5vw;
  margin: 1vw;
`;

const UserNames = styled.p`
  font-size: 3vw;
  margin-left: 0.5vw;
`;

const SubContainer = styled.div`
  margin-left: 1vw;
`;

const SubtitleText = styled.p`
  font-size: 2vw;
  text-decoration: underline;
`;

const HelperIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const HelperIcons = styled.img`
  height: 5vw;
  width: 5vw;
  margin: 1vw;
`;

//name, email, location, education, 3 skills

export default function Swiping() {
  return (
    <Wrapper>
      <SwipingContainer>
        <ArrowIcon src={leftArrow}/>
        <UserContainer>
          <UserHeader>
            <UserIcon src={swipeProfile}/>
            <UserNames>
              Kaiqi Liang
            </UserNames>
          </UserHeader>
          <SubContainer>
            <SubtitleText>
              Details
            </SubtitleText>
            <AboutRow iconType={"email"} text={"kaiqi.liang@gmail.com"}/>
            <AboutRow iconType={"location"} text={"Sydney, Australia"}/>
            <AboutRow iconType={"education"} text={"Bachelor's of Computer Science @ UNSW"}/>
          </SubContainer>
          <SubContainer>
            <SubtitleText>
              Skills
            </SubtitleText>
            <AboutRow iconType={"one"} text={"Scummaster skills"}/>
            <AboutRow iconType={"two"} text={"Pissing on call"}/>
            <AboutRow iconType={"three"} text={"Able to create Big Maclaurin"}/>
          </SubContainer>
        </UserContainer>
        <ArrowIcon src={rightArrow}/>
      </SwipingContainer>
      <HelperIconsContainer>
        <HelperIcons src={cancel}/>
        <HelperIcons src={tick}/>
      </HelperIconsContainer>
    </Wrapper>
  )
}