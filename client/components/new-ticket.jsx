import React, { useState, useContext, useEffect, Fragment } from 'react';
import AppContext from '../lib/context';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Box } from '@material-ui/core';

export default function NewTicket() {
  const history = useHistory();
  const context = useContext(AppContext);
  const [state, setState] = useState({
    priority: '',
    description: '',
    details: '',
    startDate: '',
    dueDate: new Date(),
    ownerId: '',
    assignedToId: '',
    customerId: ''
  });

  const [users, setUsers] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('/api/tickets/newform/' + context.getUser().userId)
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setPriorities(data.ticketPriorities);
        setCustomers(data.customers);
      });
  }, []);

  const handleChange = event => {
    const newState = Object.assign({}, state);
    newState[event.target.name] = event.target.value;
    setState(newState);
  };

  const handleDueDateChange = date => {
    const newState = Object.assign({}, state);
    newState.dueDate = date;
    setState(newState);
  };

  const handleCancel = () => {
    history.push('/tickets');
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newTicket = Object.assign({}, state);
    newTicket.ownerId = context.getUser().userId;
    newTicket.status = 1;
    newTicket.startDate = Date.now();
    newTicket.dueDate = newTicket.dueDate.getTime();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTicket)
    };
    fetch('/api/tickets', req)
      .then(result => {
        if (result.status === 201) {
          return result.json();
        } else if (result.status === 400) {
          throw new Error('Some fields are missing data');
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(customer => {
        if (customer) {
          context.openSnackbar('New Ticket Added');
          history.push(`/tickets/${context.getUser().userId}`);
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
        New Ticket
      </Typography>
      <Box m={1}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputLabel id="demo-simple-select-label">Customer</InputLabel>
              <Select
                labelId="customerId"
                id="customerId"
                name="customerId"
                value={state.customerId}
                onChange={handleChange}
                fullWidth>
                {customers.map(customer => {
                  return (
                    <MenuItem
                      key={customer.customerId}
                      value={customer.customerId}>
                      {`${customer.firstName} ${customer.lastName}`}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="demo-simple-select-label">Assigned To</InputLabel>
              <Select
                labelId="assignedToId"
                id="assignedToId"
                name="assignedToId"
                value={state.assignedToId}
                onChange={handleChange}
                fullWidth>
                {users.map(user => {
                  return (
                    <MenuItem
                      key={user.userId}
                      value={user.userId}>
                      {`${user.firstName} ${user.lastName}`}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                labelId="priority"
                id="priority"
                name="priority"
                value={state.priority}
                onChange={handleChange}
                fullWidth>
                {priorities.map(priority => {
                  return (
                    <MenuItem
                      key={priority.priorityId}
                      value={priority.priorityId}>
                      {priority.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  id="dueDate"
                  label="Due Date"
                  name="dueDate"
                  format="MM/dd/yyyy"
                  disablePast
                  value={state.dueDate}
                  onChange={handleDueDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                  fullWidth
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Short Description"
                fullWidth
                onChange={handleChange}
                value={state.description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="details"
                name="details"
                label="Details"
                fullWidth
                multiline
                rows="5"
                variant="filled"
                onChange={handleChange}
                value={state.details}
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
