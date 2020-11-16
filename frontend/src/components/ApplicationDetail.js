import React from 'react';
import { ModalContainer, ModalContent, CloseButton } from './Form';
import EmployerSwipingCard from './EmployerSwipingCard';

export default function ApplicantDetail({ info, skills }) {

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={(e) => {
            e.stopPropagation();
            setShow(false);
        }}/>
        <EmployerSwipingCard
          company={"Atlassian"}
          job_title={"Frontend Developer"}
          employment_type={"Part Time"}
          location={"Sydney, Australia"}
          closing_date={"24th December 2020"}
          skill1={"React"}
          skill2={"HTML"}
          skill3={"CSS"}
        />
      </ModalContent>
    </ModalContainer>
  )
}