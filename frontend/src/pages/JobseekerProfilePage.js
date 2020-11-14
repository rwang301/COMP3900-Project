import React from 'react';
import styled from "styled-components";
import edit from '../assets/edit.svg'
import AboutRow from '../components/AboutRow';
// import { SkillsRow } from '../components/Rows';
import ApplicationModal from '../components/ApplicationModal';
import { StoreContext } from '../utils/store';
import { ProfilePic } from '../components/Form';
import Divider from '@material-ui/core/Divider';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2vh;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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

const SkillEditButton = styled(SideButton)`
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

const SkillsRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

const Skill = styled.p`
  font-size: 1.25vw;
`;

export default function JobseekerProfilePage() {
  const { api } = React.useContext(StoreContext);
  const [applicationModal, setApplicationModal] = React.useState(false);
  const [email, setEmail] = React.useState();
  const [name, setName] = React.useState();
  const [password, setPassword] = React.useState();
  const [location, setLocation] = React.useState();
  const [profile, setProfile] = React.useState();
  const [education, setEducation] = React.useState();
  const [skills, setSkills] = React.useState([]);

  React.useEffect(() => {
    const getProfile = async () => {
      const response = await api.fetch('jobseeker/profile');
      if (response) {
        const {email, name, password, location, profile, education, skills} = response;
        setEmail(email);
        setName(name);
        setPassword(password);
        setLocation(location);
        setProfile(profile);
        setEducation(education);
        setSkills(skills);
      }
    };
    getProfile();
  }, []);

  const updateProfile = async () => {
    const data = {
      name,
      password,
      education,
      location,
      profile,
      skills,
    };
    const response = await api.fetch('jobseeker/profile', 'put', data);
    if (response) {
      console.log(response);
    }
  };

  return (
    <ProfileContainer >
      <AvatarContainer>
        <ProfilePic src={profile || '/broken-image.jpg'} />
        <NameText>{name}</NameText>
      </AvatarContainer>
      <AboutContainer>
        <EditButton src={edit} onClick={() => setApplicationModal(true)}/>
        <SubtitleText>
          About
        </SubtitleText>
        <AboutRowContainer>
          <AboutRow iconType={'email'} text={email || 'Click edit to update Your Email'}/>
          <AboutRow iconType={'education'} text={education || 'Click edit to update Your Education'}/>
          <AboutRow iconType={'location'} text={location || 'Click edit to update Your Location'}/>
        </AboutRowContainer>
        <SubtitleText>
          Skills
        </SubtitleText>
        {/* {skills.map((skill, idx) => skill && <SkillsRow key={idx} skillName={skill}/>)} */}
        <SkillsRow>
          <Skill>
            {skills[0]}
          </Skill>
          <Divider orientation="vertical" flexItem />
          <Skill>
            {skills[1]}
          </Skill>
          <Divider orientation="vertical" flexItem />
          <Skill>
            {skills[2]}
          </Skill>
        </SkillsRow>
      </AboutContainer>
      {applicationModal &&
        <ApplicationModal
          name={name}
          setName={setName}
          password={password}
          setPassword={setPassword}
          location={location}
          setLocation={setLocation}
          profile={profile}
          setProfile={setProfile}
          education={education}
          setEducation={setEducation}
          skills={skills}
          setSkills={setSkills}
          setShow={setApplicationModal}
          updateProfile={updateProfile}
        />
      }
    </ProfileContainer>
  )
}