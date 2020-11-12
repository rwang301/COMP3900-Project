import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

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
  },
}));

export default function StickyFooter() {
  const classes = useStyles();
  return (
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">My sticky footer can be found here.</Typography>
          <Copyright />
        </Container>
      </footer>
  );
}