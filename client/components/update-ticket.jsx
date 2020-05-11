import React, { useState, useContext, useEffect, Fragment } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../lib/context';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
  titleStyles: {
    marginTop: theme.spacing(2)
  }
}));

export default function updateTicket() {
  const context = useContext(AppContext);
  const history = useHistory();
  const { ticketId } = useParams();
  const [state, setState] = useState({
    customerId: '',
    assignedToId: '',
    priority: '',
    status: '',
    dueDate: null,
    description: '',
    details: ''
  });
  const [users, setUsers] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [status, setStatus] = useState([]);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    fetch(`/api/tickets/editform/${ticketId}`)
      .then(res => res.json())
      .then(data => {
        setUsers(data.users);
        setPriorities(data.ticketPriorities);
        setStatus(data.ticketStatuses);
        setCustomer({
          id: data.ticket.customerId,
          firstName: data.ticket.customerFirstName,
          lastName: data.ticket.customerLastName
        });
        setState(data.ticket);
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
    history.push(`/ticket/${ticketId}`);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newTicket = Object.assign({}, state);
    newTicket.dueDate = newTicket.dueDate ? new Date(newTicket.dueDate).getTime() : null;
    const req = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTicket)
    };
    fetch('/api/tickets', req)
      .then(result => {
        if (result.status === 200) {
          return result.json();
        } else if (result.status === 400) {
          throw new Error('Some fields are missing data');
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(customer => {
        if (customer) {
          context.openSnackbar('Ticket successfully edited');
          history.push(`/tickets/${context.getUser().userId}`);
        }
      })
      .catch(err => {
        context.openSnackbar(err.message);
        console.error(err);
      });
  };

  const classes = useStyles();
  return (
    <Fragment>
      <Typography className={classes.titleStyles} variant="h4" gutterBottom>
        {`Tickets: 000${ticketId}`}
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">Customer</InputLabel>
            <Select
              labelId="customer"
              id="customer"
              name="customer"
              value={customer.id ? customer.id : ''}
              onChange={handleChange}
              fullWidth
              disabled
            >
              {customer.id ? (
                <MenuItem key={customer.id} value={customer.id}>
                  {`${customer.firstName} ${customer.lastName}`}
                </MenuItem>
              ) : null}
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
              fullWidth
            >
              {users.map(user => {
                return (
                  <MenuItem key={user.userId} value={user.userId}>
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
              fullWidth
            >
              {priorities.map(priority => {
                return (
                  <MenuItem
                    key={priority.priorityId}
                    value={priority.priorityId}
                  >
                    {priority.name}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="status"
              id="status"
              name="status"
              value={state.status}
              onChange={handleChange}
              fullWidth
            >
              {status.map(stat => {
                return (
                  <MenuItem key={stat.statusId} value={stat.statusId}>
                    {stat.name}
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
            <Button type="submit" fullWidth variant="contained" color="primary">
              Edit
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button onClick={handleCancel} fullWidth variant="contained">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
}
