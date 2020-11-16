import React from 'react';
import styled from "styled-components";
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';
import tick from '../assets/tick.svg';
import cancel from '../assets/cancel.svg';
import noMoreSwipes from '../assets/no_more_swipes.svg';
import { StoreContext } from '../utils/store';
import EmployerSwipingCard from '../components/EmployerSwipingCard';
import JobseekerSwipingCard from '../components/JobseekerSwipingCard';

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
  const { api, employer } = React.useContext(StoreContext);
  const [potentials, setPotentials] = React.useState();
  const [index, setIndex] = React.useState(0);
  const [noSwipes, setNoSwipes] = React.useState(false);

  React.useEffect(() => {
    const getPotentials = async () => {
      const response = employer ? await api.fetch('potential/jobseekers') : await api.fetch('potential/jobs');
      if (response && response.length) {
          setPotentials(response);
          console.log(response)
      } else {
        setNoSwipes(true);
      }
    }
    getPotentials();
  }, []);

  const accept = () => {
    if (employer) {
      api.fetch('employer/swipe/right', 'post', {email: potentials[index].email});
    } else {
      api.fetch('jobseeker/swipe/right', 'post', {id: potentials[index].id});
    }
    if (index + 1 === potentials.length) {
      setNoSwipes(true);
    } else {
      setIndex(index + 1);
    }
  }

  const decline = async () => {
    if (employer) {
      api.fetch('employer/swipe/left', 'post', {email: potentials[index].email});
    } else {
      api.fetch('jobseeker/swipe/left', 'post', {id: potentials[index].id});
    }
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
          <NoSwipesIcon src={noMoreSwipes} />
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
            {employer ? 
              <EmployerSwipingCard 
                email={potentials ? potentials[index].email : "Email"} 
                name={potentials ? potentials[index].name : "Name"} 
                location={potentials ? potentials[index].location : "Location"} 
                profile={potentials && potentials[index].profile}
                education={potentials ? potentials[index].education : "Education"} 
                skill1={potentials ? potentials[index].skill1 : "Skill 1"} 
                skill2={potentials ? potentials[index].skill2 : "Skill 2"} 
                skill3={potentials ? potentials[index].skill3 : "Skill 3"} 
              />
              :
              <JobseekerSwipingCard
                company={potentials ? potentials[index].company: "Company"}
                job_title={potentials ? potentials[index].job_title: "Job Title"}
                employment_type={potentials ? potentials[index].employment_type: "Employment Type"}
                location={potentials ? potentials[index].location: "Location"}
                closing_date={potentials ? potentials[index].closing_date: "Closing Date"}
                skill1={potentials ? potentials[index].skill1 : "Skill 1"} 
                skill2={potentials ? potentials[index].skill2 : "Skill 2"} 
                skill3={potentials ? potentials[index].skill3 : "Skill 3"} 
              />
            }
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