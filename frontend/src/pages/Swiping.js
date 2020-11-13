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
  const [potentials, setPotentials] = React.useState(null);
  // const [potentials, setPotentials] = React.useState([
  //   {"email": "test@gmail.com", "name": "Richard Wang", "location": "Dee Why", "education": "UNSW", "skill1": "procastinating", "skill2": "not comp3900", "skill3": "THE BOYS"},
  //   {"email": "test@gmail.com", "name": "Kaiqi Liang", "location": "Dee Why", "education": "UNSW", "skill1": "procastinating", "skill2": "comp3900", "skill3": "THE BOYS"},
  //   {"email": "test@gmail.com", "name": "William Huang", "location": "Dee Why", "education": "UNSW", "skill1": "procastinating", "skill2": "woolies for the boys", "skill3": "THE BOYS"},
  //   {"email": "test@gmail.com", "name": "Tony Lu", "location": "Dee Why", "education": "UNSW", "skill1": "procastinating", "skill2": "investing", "skill3": "THE BOYS"},
  // ]);
  const [index, setIndex] = React.useState(0);
  const [noSwipes, setNoSwipes] = React.useState(false);

  React.useEffect(() => {
    const getPotentialJobSeekers = async () => {
      const response = await api.fetch('potential/jobseekers');
      if (response && response.length) {
        setPotentials(response);
        console.log(response, 'POTENTIAL JOBSEEKERS OKAAAAAAAY');
      } else {
        setNoSwipes(true);
      }
    }
    getPotentialJobSeekers();
  }, []);

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
              email={potentials ? potentials[index].email : "Email"} 
              name={potentials ? potentials[index].name : "Name"} 
              location={potentials ? potentials[index].location : "Location"} 
              education={potentials ? potentials[index].education : "Education"} 
              skill1={potentials ? potentials[index].skill1 : "Skill 1"} 
              skill2={potentials ? potentials[index].skill2 : "Skill 2"} 
              skill3={potentials ? potentials[index].skill3 : "Skill 3"} 
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