import React from 'react';
import styled from "styled-components";
import PostJobModal from '../components/PostJobModal';

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
  }
`;

export default function ProfilePage() {
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
    <ProfileContainer onClick={() => setPostJobModal(true)}>
      <Button>Post a Job</Button>
      <PostJobModal toShow={postJobModal} setShow={setPostJobModal} postJob={fetchData}/>
    </ProfileContainer>
  )
}