import React from 'react';
import { ModalContainer, ModalContent, CloseButton } from './Form';
import JobseekerSwipingCard from './JobseekerSwipingCard';

export default function ApplicationDetail({ info, skills, setShow }) {

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={(e) => {
            e.stopPropagation();
            setShow(false);
        }}/>
        <JobseekerSwipingCard
          company={info.company}
          job_title={info.job_title}
          employment_type={info.employment_type}
          location={(info.location !== "null") && info.location}
          closing_date={info.closing_date}
          skill1={(skills[0] !== "null") && skills[0]}
          skill2={(skills[1] !== "null") && skills[1]}
          skill3={(skills[2] !== "null") && skills[2]}
        />
      </ModalContent>
    </ModalContainer>
  )
}
