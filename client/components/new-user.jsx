import React, { useState, useContext, Fragment } from 'react';
import AppContext from '../lib/context';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';

export default function NewUser() {
  const context = useContext(AppContext);
  const history = useHistory();

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    password: ''
  });

  const handleChange = event => {
    const newState = Object.assign({}, state);
    newState[event.target.name] = event.target.value;
    setState(newState);
  };

  const handleCancel = () => {
    history.push('/organization');
  };

  const handleSubmit = event => {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    };
    fetch('/api/signup', req)
      .then(result => {
        if (result.status === 201) {
          return result.json();
        } else {
          throw new Error('email already taken');
        }
      })
      .then(user => {
        if (user) {
          context.openSnackbar('New User Added');
          history.push('/organization');
        }
      })
      .catch(err => {
        context.openSnackbar(err.message);
        console.error(err);

      });
  };

  return (
    <Fragment>
      <Typography variant="h4" gutterBottom>
        New User
      </Typography>
      <Box m={1}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
                onChange={handleChange}
                value={state.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                fullWidth
                onChange={handleChange}
                value={state.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="jobTitle"
                name="jobTitle"
                label="Job Title"
                fullWidth
                onChange={handleChange}
                value={state.jobTitle}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="email"
                id="email"
                name="email"
                label="E-mail"
                fullWidth
                onChange={handleChange}
                value={state.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="password"
                id="password"
                name="password"
                label="Password"
                fullWidth
                onChange={handleChange}
                value={state.password}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
              Submit
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={handleCancel}
                fullWidth
                variant="contained"
              >
              Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Fragment>
  );
}
