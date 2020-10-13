import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import lock from '../assets/lock.svg';
import profile from '../assets/profile.svg';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



const Div = styled.div`
  display: flex;
  align-items: center;
  cursor: ${props => props.login ? 'pointer' : 'unset'};
  
  & > p {
    color: ${props => props.login ? 'white' : 'red'};
    margin-right: 0.25vw;
  }

  & > img {
    height: 2vw;
    margin-right: 0.5vw;
  }
`;

const Paragraph = styled.p`
  font-size: 2vw;
  visibility: ${props => props.login || props.visible ? 'unset' : 'hidden'};
`;

const DropdownArrow = styled.div`
  border: solid white;
  border-width: 0 3px 3px 0;
  //display: inline-block;
  padding: 3px;
  display: ${props => props.login ? 'unset' : 'none'};
  transform: rotate(45deg);
`;

const DropdownLink = styled(Link)`
  /* position: relative;
  display: inline-block; */
  text-decoration: none;
`;

const Dropdown = styled.div`
  
`;

// const DropdownTriangle = styled.div`
//   position: absolute;
//   top: 4.9vw;
// 	left: 11.4vw;
// 	width: 0;
// 	height: 0;
// 	border: 8px solid transparent;
// 	border-bottom-color: #f9f9f9;
// 	border-top: 0;
//   /* margin-top: 5vw;
//   margin-left: 5.2vw; */
//   /* box-shadow: 0px 4px 8px 0px #bababa; */
//   z-index: 1;
// `;



const DropdownMenu = styled.div`
  display: block;
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 8px 0px #bababa;
  z-index: 1;
  width: 13vw;
  margin-top: -1vw;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 1vmin;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: inherit;
    border-top: 0;
    margin-top: -0.63vw;
    z-index: 3;
  };

  & > a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover{
      background-color: #c6f5f7;
    };


  }
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${DropdownMenu} {
    display: block;
  };
`;

const OptionText = styled.p`
    font-size: 1vw;
`;

export default function NavDropdown(props) {
  return (
    <Wrapper>
      {/* <DropdownLink to='/'> */}
        <Div login={props.login} onClick={props.login ? props.logout : undefined}>
          <img src={props.login ? profile : lock} alt="Lock"></img>
          <Paragraph login={props.login} visible={true}>My Profile</Paragraph>
          &nbsp;
          <DropdownArrow login={props.login}/>
        </Div>
        <DropdownMenu>
          <a href="">
            <OptionText>
              My Account
            </OptionText>
            <AccountBoxIcon/>
          </a>
          <a href="">
            <OptionText>
              Logout
            </OptionText>
            <ExitToAppIcon/>
          </a>
        </DropdownMenu>


      {/* </DropdownLink> */}
    </Wrapper>
  )
}