import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { StoreContext } from '../utils/store';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();
  const { alert, setAlert } = React.useContext(StoreContext);

  const handleClose = () => {
    setAlert({ open: false, severity: '', message: '' });
  };

  return (
    <div className={classes.root}>
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.severity}>{alert.message}</Alert>
      </Snackbar>
    </div>
  );
}