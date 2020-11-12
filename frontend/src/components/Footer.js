import React from 'react';
import styled from "styled-components";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import instagram from '../assets/instagram.svg'
import facebook from '../assets/facebook.svg'
import twitter from '../assets/twitter.svg'
import linkedin from '../assets/linkedin.svg'

const SocialIcon = styled.img`
  height: 5vh;
  width: 5vw;
  opacity: 40%;
`;

const IconRow = styled.div`
  display: flex;
  /* flex-direction: row; */
  align-items: center;
  justify-content: center;
  margin-bottom: 2vh;
`;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" target='_blank' href="https://github.com/unsw-cse-capstone-project/capstone-project-comp3900-w17a-kai-will-make-tony-rich">
        Kai-Will-Make-Tony-Rich
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: '#2b3d4a',
    textAlign: 'center'
  },
}));

export default function StickyFooter() {
  const classes = useStyles();
  return (
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <IconRow>
            <Link color="inherit" target='_blank' href="https://github.com/unsw-cse-capstone-project/capstone-project-comp3900-w17a-kai-will-make-tony-rich">
              <SocialIcon src={facebook}/>
            </Link>
            <Link color="inherit" target='_blank' href="https://github.com/unsw-cse-capstone-project/capstone-project-comp3900-w17a-kai-will-make-tony-rich">
              <SocialIcon src={instagram}/>
            </Link>
            <Link color="inherit" target='_blank' href="https://github.com/unsw-cse-capstone-project/capstone-project-comp3900-w17a-kai-will-make-tony-rich">
              <SocialIcon src={linkedin}/>
            </Link>
            <Link color="inherit" target='_blank' href="https://github.com/unsw-cse-capstone-project/capstone-project-comp3900-w17a-kai-will-make-tony-rich">
              <SocialIcon src={twitter}/>
            </Link>
          </IconRow>
          <Typography variant="body1">Kaiqi Liang, William Huang, Tony Lu, Richard Wang</Typography>
          <Copyright />
        </Container>
      </footer>
  );
}