import React from 'react';
import styled from "styled-components";
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';
import tick from '../assets/tick.svg';
import cancel from '../assets/cancel.svg';
import nomoreswipes from '../assets/nomoreswipes.svg';
import { StoreContext } from '../utils/store';
import SwipingCard from '../components/SwipingCard';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SwipingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
`;

const ArrowIcon = styled.img`
  height: 5vw;
  width: 5vw;
  margin: 1vw;
  cursor: pointer;
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

const NoSwipesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  align-items: center;
`;

const NoSwipesIcon= styled.img`
  height: 10vw;
  width: 10vw;
`;

const NoSwipeText = styled.p`
  font-weight: bold;
`;


export default function Swiping() {
  const { api } = React.useContext(StoreContext);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [education, setEducation] = React.useState('');
  const [skill1, setSkill1] = React.useState('');
  const [skill2, setSkill2] = React.useState('');
  const [skill3, setSkill3] = React.useState('');
  const [potentials, setPotentials] = React.useState([
    {"email": "test@gmail.com", "name": "Richard Wang", "location": "Dee Why", "education": "UNSW", "skill1": "procastinating", "skill2": "not comp3900", "skill3": "THE BOYS"},
    {"email": "test@gmail.com", "name": "Kaiqi Liang", "location": "Dee Why", "education": "UNSW", "skill1": "procastinating", "skill2": "comp3900", "skill3": "THE BOYS"},
    {"email": "test@gmail.com", "name": "William Huang", "location": "Dee Why", "education": "UNSW", "skill1": "procastinating", "skill2": "woolies for the boys", "skill3": "THE BOYS"},
    {"email": "test@gmail.com", "name": "Tony Lu", "location": "Dee Why", "education": "UNSW", "skill1": "procastinating", "skill2": "investing", "skill3": "THE BOYS"},
  ]);
  const [index, setIndex] = React.useState(0);
  const [noSwipes, setNoSwipes] = React.useState(false);

  // React.useEffect(() => {
  //   const getPotentialJobSeekers = async () => {
  //     const response = await api.fetch('potential/jobseekers');
  //     if (response && response.length) {
  //       const {email, name, location, education, skill1, skill2, skill3} = response[0];
  //       setEmail(email);
  //       setName(name);
  //       setLocation(location);
  //       setEducation(education);
  //       setSkill1(skill1);
  //       setSkill2(skill2);
  //       setSkill3(skill3);
  //     }
  //   }
  //   getPotentialJobSeekers();
  //   if (potentials.length === 0) setNoSwipes(true);
  // }, []);

  const accept = () => {
    console.log('i want you!');
    if (index + 1 === potentials.length) {
      setNoSwipes(true);
    } else {
      setIndex(index + 1);
    }
  }

  const decline = () => {
    console.log('i dont want you!');
    if (index + 1 === potentials.length) {
      setNoSwipes(true);
    } else {
      setIndex(index + 1);
    }
  }

  let curr_email = potentials[index].email;
  let curr_name = potentials[index].name;
  let curr_location = potentials[index].location;
  let curr_education = potentials[index].education;
  let curr_skill1 = potentials[index].skill1;
  let curr_skill2 = potentials[index].skill2;
  let curr_skill3 = potentials[index].skill3;

  return (
    <Wrapper>
      {noSwipes ? 
        <NoSwipesContainer>
          <NoSwipesIcon src={nomoreswipes} />
          <NoSwipeText>
            There are currently no profiles to swipe...
          </NoSwipeText>
          <NoSwipeText>
            Refresh or try again in a few moments
          </NoSwipeText>
        </NoSwipesContainer>
        :
        <>
          <SwipingContainer>
            <ArrowIcon src={leftArrow} onClick={decline} />
            <SwipingCard 
              email={curr_email} 
              name={curr_name} 
              location={curr_location} 
              education={curr_education} 
              skill1={curr_skill1} 
              skill2={curr_skill2} 
              skill3={curr_skill3} 
            />
            <ArrowIcon src={rightArrow} onClick={accept} />
          </SwipingContainer>
          <HelperIconsContainer>
            <HelperIcons src={cancel}/>
            <HelperIcons src={tick}/>
          </HelperIconsContainer>
      </>
      
      
      }

    </Wrapper>
  )
}