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
          email={"rich@wang.com"}
          name={"Richard Wang"} 
          location={"Sydney, Australia"}
          education={"UNSW Sydney"}
          skill1={"React"}
          skill2={"HTML"}
          skill3={"CSS"}
        />
      </ModalContent>
    </ModalContainer>
  )
}