import React, { useState, useContext, Fragment } from 'react';
import AppContext from '../lib/context';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

export default function NewCustomer() {
  const history = useHistory();
  const context = useContext(AppContext);
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    jobTitle: '',
    phoneNumber: '',
    email: '',
    addressStreet: '',
    addressCity: '',
    addressState: '',
    addressZip: ''
  });

  const handleChange = event => {
    const newState = Object.assign({}, state);
    newState[event.target.name] = event.target.value;
    setState(newState);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newCustomer = Object.assign({}, state);
    newCustomer.repId = context.getUser().userId;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCustomer)
    };
    fetch('/api/customers', req)
      .then(result => {
        if (result.status === 201) {
          return result.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(customer => {
        if (customer) {
          context.openSnackbar('New Customer Added');
          history.push('/customers');
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <Fragment>
      <Typography variant="h4" gutterBottom>
        New Customer
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              onChange={handleChange}
              value={state.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              onChange={handleChange}
              value={state.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="companyName"
              name="companyName"
              label="Company Name"
              fullWidth
              onChange={handleChange}
              value={state.companyName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="Phone"
              fullWidth
              onChange={handleChange}
              value={state.phoneNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
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
              id="addressStreet"
              name="addressStreet"
              label="Address"
              fullWidth
              onChange={handleChange}
              value={state.addressStreet}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="addressCity"
              name="addressCity"
              label="City"
              fullWidth
              onChange={handleChange}
              value={state.addressCity}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              required
              id="addressState"
              name="addressState"
              label="State"
              fullWidth
              onChange={handleChange}
              value={state.addressState}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              required
              id="addressZip"
              name="addressZip"
              label="Zip Code"
              fullWidth
              onChange={handleChange}
              value={state.addressZip}
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
              type="submit"
              fullWidth
              variant="contained"
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
}
