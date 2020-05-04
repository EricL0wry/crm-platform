import React, { Fragment } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import AppContext from '../lib/context';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    const loginInput = {};
    loginInput.email = this.state.email;
    loginInput.password = this.state.password;

    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInput)
    };
    fetch('/api/login', req)
      .then(response => response.json())
      .then(data => {
        this.context.onLogin(data);

      });
  }

  render() {
    return (
      <Fragment>
        <Grid container direction="column">
          <Grid item container>
            <Grid item xs={0} md={4} />
            <Grid item container xs={12} md={4} direction="column">
              <form onSubmit={this.handleSubmit}>
                <Box display="flex" flexDirection="column" justifyContent="center">
                  <Input
                    placeholder="email"
                    type="email"
                    name="email"
                    required
                    inputProps={{ 'aria-label': 'description' }}
                    onChange={this.onChange} />
                  <Input
                    placeholder="password"
                    type="password"
                    name="password"
                    required
                    inputProps={{ 'aria-label': 'description' }}
                    onChange={this.onChange} />
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit">Log In</Button>
                </Box>

              </form>
            </Grid>
            <Grid item xs={0} md={4} />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Login.contextType = AppContext;
