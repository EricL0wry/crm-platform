import React, { useState, useContext, useEffect, Fragment } from 'react';
import { useHistory } from 'react-dom';
import AppContext from '../lib/context';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function updateTicket() {
  const history = useHistory();
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
    fetch('/api/tickets/editform/' + context.getUser().tickedId)
      .then(res => res.json())
      .then(data => {
        setUsers(ticket.users);
        setPriorities(ticket.priorities);
        setStatus(ticket.status);
      });
  }, []);
}
