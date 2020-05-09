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
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
  titleStyles: {
    marginTop: theme.spacing(2)
  }
}));

export default function updateTicket() {
  // const history = useHistory();
  const { ticketId } = useParams();
  const context = useContext(AppContext);
  const [ticket, setTicket] = useState({
    customeerId: '',
    assignedToId: '',
    priority: '',
    status: '',
    dueDate: new Date(),
    description: '',
    details: ''
  });
  const [users, setUsers] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    fetch(`/api/tickets/editform/${ticketId}`)
      .then(res => res.json())
      .then(data => {
        setUsers(ticket.users);
        setPriorities(ticket.priorities);
        setStatus(ticket.status);
        console.log(ticketId);
      });
  }, []);

  const classes = useStyles();
  return (
    <Fragment>
      <Typography className={classes.titleStyles} variant="h4" gutterBottom gutterTop>{`Tickets: 000${ticketId}`}</Typography>
    </Fragment>
  );
}
