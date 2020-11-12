import React from 'react';
import styled from "styled-components";
import { Link, Redirect } from 'react-router-dom';
import { StoreContext } from '../utils/store';

const Section = styled.section`
  width: 50vmin;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  max-width: 20vmin;
  width: 20vmin;
  height: 8vmin;
  font-size: 3vmin;
  border-radius: 5px;
  background: whitesmoke;
  color: black;
  border: 3px solid darkcyan;

  &:hover {
    font-weight: bold;
    background: black;
    color: whitesmoke;
    border: 1px solid whitesmoke;
  }
`;

export default function Buttons({primaryRoute, secondaryRoute, primaryInnerText, secondaryInnerText}) {
  const [success, setSuccess] = React.useState('');
  const { setEmployer } = React.useContext(StoreContext);
  async function onClickHandler() {
    setSuccess(await primaryRoute());
  }

  let button;
  if (typeof primaryRoute === 'function') {
    if (success) {
      setEmployer(success === 'employer');
      button = <Redirect to={success} />;
    } else {
      button = <Button onClick={onClickHandler}>{primaryInnerText}</Button>;
    }
  } else {
    button = (
      <Link to={primaryRoute}>
        <Button>{primaryInnerText}</Button>
      </Link>
    );
  }

  return (
    <Section>
      {button}
      <Link to={secondaryRoute}>
        <Button>
          {secondaryInnerText}
        </Button>
      </Link>
    </Section>
  )
}