import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0
  }
}));

export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size={100} />
    </div>
  );
}
