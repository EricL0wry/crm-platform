import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppContext from '../lib/context';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '95vh'
  },
  logo: {
    width: '100%',
    objectFit: 'contain'
  },
  loginForm: {
    width: '100%',
    minHeight: '250px',
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
    <Container className={classes.root} maxWidth="xs">
      <img className={classes.logo} src="/images/BasedLongMedBlue.png" />
      <form className={classes.loginForm} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          error={state.error === usernameErrMsg}
          helperText={state.error === usernameErrMsg ? usernameErrMsg : ''}
          type="email"
          name="email"
          label="E-mail"
          required
          inputProps={{ 'aria-label': 'description' }}
          onChange={onChange}
          value={state.email}/>
        <TextField
          variant="outlined"
          error={state.error === passwordErrMsg}
          helperText={state.error === passwordErrMsg ? passwordErrMsg : ''}
          label="password"
          type="password"
          name="password"
          required
          inputProps={{ 'aria-label': 'description' }}
          onChange={onChange}
          value={state.password} />
        <Button
          className={classes.loginButton}
          color="primary"
          variant="contained"
          type="submit">Log In</Button>
      </form>
    </Container>
  );
}
