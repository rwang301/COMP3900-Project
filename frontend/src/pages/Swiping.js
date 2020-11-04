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
  width: 80%;
  justify-content: space-evenly;;
`;

const HelperIcons = styled.img`
  height: 5vw;
  width: 5vw;
  margin: 1vw;
`;

export default function Swiping() {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [education, setEducation] = React.useState('');
  const [skill1, setSkill1] = React.useState('');
  const [skill2, setSkill2] = React.useState('');
  const [skill3, setSkill3] = React.useState('');

  React.useEffect(() => {
    const getPotentialJobSeekers = async () => {
      const options = {
        headers: {
          'token': localStorage.getItem('token')
        },
      };
      const response = await fetch("http://localhost:8000/potential/jobseekers", options);
      const json = await response.json();
      if (json.length) {
        const {email, name, location, education, skill1, skill2, skill3} = json[0];
        setEmail(email);
        setName(name);
        setLocation(location);
        setEducation(education);
        setSkill1(skill1);
        setSkill2(skill2);
        setSkill3(skill3);
      }
    }
    getPotentialJobSeekers();
  }, []);

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
              <AboutRow iconType={"email"} text={email}/>
              <AboutRow iconType={"location"} text={location}/>
              <AboutRow iconType={"education"} text={education}/>
          </SubContainer>
          <SubContainer>
            <SubtitleText>
                Skills
            </SubtitleText>
            <AboutRow iconType={"one"} text={skill1}/>
            <AboutRow iconType={"two"} text={skill2}/>
            <AboutRow iconType={"three"} text={skill3}/>
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