import React from 'react';
import { ModalContainer, ModalContent, CloseButton } from './Form';
import EmployerSwipingCard from './EmployerSwipingCard';

export default function ApplicantDetail({ info, skills, setShow }) {

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={(e) => {
            e.stopPropagation();
            setShow(false);
        }}/>
        <EmployerSwipingCard
          email={info.email}
          name={info.name} 
          profile={info.profile}
          location={(info.location !== "null") && info.location}
          education={info.education}
          skill1={(skills[0] !== "null") && skills[0]}
          skill2={(skills[1] !== "null") && skills[1]}
          skill3={(skills[2] !== "null") && skills[2]}
        />
      </ModalContent>
    </ModalContainer>
  )
}