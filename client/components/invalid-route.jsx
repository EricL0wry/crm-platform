import React from 'react';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '95vh'
    },
    image: {
      width: '100%',
      objectFit: 'contain'
    },
    errorText: {
      textAlign: 'center',
      margin: theme.spacing(5, 1)
    }
  };
});

export default function InvalidRoute() {
  const classes = useStyles();
  const history = useHistory();

  const routeToDashboard = () => {
    history.push('/');
  };

  return (
    <Container className={classes.root} maxWidth='xs'>
      <img src="/images/NotStonks.png" className={classes.image} />
      <Typography variant="h6" className={classes.errorText}>
        Oops! We were unable to locate that paged BASED on your selection.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        type="button" onClick={routeToDashboard}>Dashboard</Button>
    </Container>
  );
}
