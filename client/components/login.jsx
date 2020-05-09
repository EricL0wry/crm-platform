import React, { Fragment, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppContext from '../lib/context';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '90vh'
  },
  logo: {
    width: '100%',
    objectFit: 'contain'
  },
  loginContainer: {
    height: '50%'
  },
  loginForm: {
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  }
}));

export default function Login() {
  const classes = useStyles();
  const context = useContext(AppContext);
  const usernameErrMsg = 'Could not find user';
  const passwordErrMsg = 'Incorrect password';
  const [state, setState] = useState({
    email: '',
    password: '',
    error: ''
  });

  const onChange = event => {
    const newState = Object.assign({}, state);
    newState[event.target.name] = event.target.value;
    setState(newState);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const loginInput = {};
    loginInput.email = state.email;
    loginInput.password = state.password;

    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInput)
    };
    fetch('/api/login', req)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error(usernameErrMsg);
        } else {
          throw new Error(passwordErrMsg);
        }
      })
      .then(data => {
        context.onLogin(data);
      })
      .catch(err => {
        const newState = Object.assign({}, state);
        newState.error = err.message;
        setState(newState);
      });
  };

  return (
    <Fragment>
      <Grid className={classes.root} container direction="column" alignItems="center" justify="center">
        <Grid className={ classes.loginContainer } item container xs={12} sm={8} md={3} direction="column" alignItems="center">
          <img className={classes.logo} src="/images/placeholder-logo.png" />
          <form className={classes.loginForm} onSubmit={handleSubmit}>
            <TextField
              error={state.error === usernameErrMsg}
              helperText={state.error === usernameErrMsg ? usernameErrMsg : ''}
              placeholder="email"
              type="email"
              name="email"
              required
              inputProps={{ 'aria-label': 'description' }}
              onChange={onChange}
              value={state.email} />
            <TextField
              error={state.error === passwordErrMsg}
              helperText={state.error === passwordErrMsg ? passwordErrMsg : ''}
              placeholder="password"
              type="password"
              name="password"
              required
              inputProps={{ 'aria-label': 'description' }}
              onChange={onChange}
              value={state.password} />
            <Button
              color="primary"
              variant="contained"
              type="submit">Log In</Button>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );

}
