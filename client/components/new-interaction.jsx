import React, { useState, useContext, Fragment } from 'react';
import AppContext from '../lib/context';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useHistory, useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';

export default function NewInteraction() {

  const { customerId } = useParams();
  const history = useHistory();
  const context = useContext(AppContext);

  const [state, setState] = useState({
    type: '',
    notes: '',
    date: new Date()
  });

  const handleDateChange = date => {
    const newState = Object.assign({}, state);
    newState.date = date;
    setState(newState);
  };

  const handleChange = event => {
    const newState = Object.assign({}, state);
    newState[event.target.name] = event.target.value;
    setState(newState);
  };

  const handleCancel = () => {
    history.push(`/customers/${customerId}`);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newInteraction = Object.assign({}, state);
    newInteraction.userId = context.getUser().userId;
    newInteraction.customerId = customerId;
    // newInteraction.timeCreated = newInteraction.date + 'T' + newInteraction.time + ':00';
    newInteraction.timeCreated = state.date.getTime();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newInteraction)
    };
    fetch('/api/interactions', req)
      .then(result => {
        if (result.status === 201) {
          return result.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(customer => {
        if (customer) {
          context.openSnackbar('New Interaction Added');
          history.push(`/customers/${customerId}`);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <Fragment>
      <Typography variant="h4" gutterBottom>
        Add interaction
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="type"
              name="type"
              label="Type"
              fullWidth
              onChange={handleChange}
              value={state.type}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  id="Date"
                  label="Date"
                  name="Date"
                  format="MM/dd/yyyy"
                  disablePast
                  value={state.date}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  fullWidth
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time"
                  value={state.date}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time'
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="notes"
              name="notes"
              label="Notes"
              fullWidth
              onChange={handleChange}
              value={state.notes}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Add
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

    </Fragment>
  );
}
