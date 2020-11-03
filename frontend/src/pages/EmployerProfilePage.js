import React from 'react';
import styled from "styled-components";
import PostJobModal from '../components/PostJobModal';
import kai_dp from '../assets/kai_dp.jpg'
import edit from '../assets/edit.svg'
import add from '../assets/add.svg'
import AboutRow from '../components/AboutRow';
import { ListedJobRow } from '../components/Rows';


const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2vh;
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
  };
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ProfilePic = styled.img`
  height: 10vw;
  width: 10vw;
  max-width: 20vw;
`;

const KaiPic = styled(ProfilePic)`
  border-radius: 10vw;
`;

const NameText = styled.p`
  font-size: 2.5vw;
`;

const SideButton = styled.img`
  position: absolute;
  cursor: pointer;
  height: 2vw;
  width: 2vw;
  margin-left: 17.5vw;
`;

const EditButton = styled(SideButton)`
  margin-top: 1.15vw;
`;

const AddButton = styled(SideButton)`
  margin-top: 19.75vw;
`;

const AboutContainer = styled.div`
  border: 3px solid white;
  border-radius: 1vw;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubtitleText = styled.p`
  font-size: 1.5vw;
  font-weight: bold;
`;

const AboutRowContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function EmployerProfilePage() {
  const [postJobModal, setPostJobModal] = React.useState(false);
  
  const fetchData = async (jobTitle, location, description, closingDate, employmentType) => {
    const data = {
      "job_title": jobTitle,
      "location": location,
      "description": description,
      "employment_type": employmentType,
      "closing_date": closingDate
    };
    const options = {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      },
    };
    const response = await fetch("http://localhost:8000/post/job", options);
    console.log(response);
  };

  return (
    <ProfileContainer >
      <AvatarContainer>
        <KaiPic src={kai_dp}/>
        <NameText>Kaiqi Liang</NameText>
      </AvatarContainer>
      <AboutContainer>
        <EditButton src={edit} />
        <SubtitleText>
          About
        </SubtitleText>
        <AboutRowContainer>
          <AboutRow iconType={'email'} text={'kaiqi.liang@gmail.com'}/>
          <AboutRow iconType={'company'} text={'Deloitte Recruiting'}/>
          <AboutRow iconType={'location'} text={'Sydney, Australia'}/>
        </AboutRowContainer>
        <SubtitleText>
          Listed Jobs
        </SubtitleText>
        <ListedJobRow jobTitle={"Software Engineer"}/>
        <ListedJobRow jobTitle={"HR Manager"}/>
        <ListedJobRow jobTitle={"Product Specialist"}/>
        <AddButton src={add} onClick={() => setPostJobModal(true)}/>
      </AboutContainer>
      <PostJobModal toShow={postJobModal} setShow={setPostJobModal} postJob={fetchData}/>
    </ProfileContainer>
  )
}