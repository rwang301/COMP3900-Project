import React from 'react';
import styled from "styled-components";
import PostJobModal from '../components/PostJobModal';
import kai_dp from '../assets/kai_dp.jpg'
import edit from '../assets/edit.svg'
import add from '../assets/add.svg'
import AboutRow from '../components/AboutRow';
import { ListedJobRow } from '../components/Rows';
import { StoreContext } from '../utils/store';
import EmployerDetailModal from '../components/EmployerDetailModal';

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
  const { api } = React.useContext(StoreContext);
  const [postJobModal, setPostJobModal] = React.useState(false);
  const [updateDetailsModal, setUpdateDetailsModal] = React.useState(false);
  const [jobsToRender, setJobsToRender] = React.useState([]);
  const [email, setEmail] = React.useState();
  const [company, setCompany] = React.useState();
  const [location, setLocation] = React.useState();

  React.useEffect(() => {
    const getJobs = async () => {
      const response = await api.fetch('profile/jobs');
      if (response) {
        setJobsToRender(response);
        //TODO: update email, company, location
      }
    };
    getJobs();
  }, []);
  
  const postJob = async (jobTitle, location, description, skillOne, skillTwo, skillThree, closingDate, employmentType) => {
    const data = {
      "job_title": jobTitle,
      "location": location,
      "description": description,
      "skills": [skillOne, skillTwo, skillThree],
      "employment_type": employmentType,
      "closing_date": closingDate
    };
    const response = await api.fetch('job', 'post', data);
    if (response) {
      setJobsToRender([...jobsToRender, { ...data, id: response.id }]);
      setPostJobModal(false);
    }
  };

  return (
    <ProfileContainer >
      <AvatarContainer>
        <KaiPic src={kai_dp}/>
        <NameText>Kaiqi Liang</NameText>
      </AvatarContainer>
      <AboutContainer>
        <EditButton src={edit} onClick={() => setUpdateDetailsModal(true)} />
        <SubtitleText>
          About
        </SubtitleText>
        <AboutRowContainer>
          <AboutRow iconType={'email'} text={email || 'Click edit to update Your Email'}/>
          <AboutRow iconType={'company'} text={company || 'Click edit to update Your Company'}/>
          <AboutRow iconType={'location'} text={location || 'Click edit to update Your Location' }/>
        </AboutRowContainer>
        <SubtitleText>
          Listed Jobs
        </SubtitleText>
        {jobsToRender.map((job) => <ListedJobRow key={job.id} job={job} />)}
        <AddButton src={add} onClick={() => setPostJobModal(true)}/>
      </AboutContainer>
      {updateDetailsModal &&
        <EmployerDetailModal
          email={email}
          company={company}
          location={location}
          setEmail={setEmail}
          setCompany={setCompany}
          setLocation={setLocation}
          closeModal={() => setUpdateDetailsModal(false)}
          updateProfile={() => api.fetch('employer/profile', 'put', { email, company, location })}
        />
      }
      {postJobModal && <PostJobModal closeModal={() => setPostJobModal(false)} postJob={postJob}/>}
    </ProfileContainer>
  )
}