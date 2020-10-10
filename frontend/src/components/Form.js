import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 50vmin;
`;

const Link = styled.a`
  cursor: pointer;
  font-size: 2vmin;
  margin: 3vmin 0 5vmin 0;
  text-decoration: underline;
`;

const Header = styled.h1`
  font-size: 3em;
`;

export { Main, Header, Form, Link };
