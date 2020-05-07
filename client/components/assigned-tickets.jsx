import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core';
import AppContext from '../lib/context';
import TicketList from './ticket-list';

const useStyles = makeStyles(theme => ({
  addButton: {
    marginLeft: theme.spacing(12)
  },
  titleStyles: {
    marginTop: theme.spacing(2)
  }
}));

export default function AssignedTickets() {
  const context = useContext(AppContext);
  const [ticketList, setTicketList] = useState([]);
  const id = context.getUser().userId;

  useEffect(() => {
    fetch('/api/tickets/' + id)
      .then(res => res.json())
      .then(data => {
        setTicketList(data);
      })
      .catch(error => console.error(error));
  }, []);
  const classes = useStyles();
  if (ticketList !== null) {
    return (
      <Fragment>
        <Typography className={classes.titleStyles} variant="h4">
          My Customers
          <Link className={classes.addButton} to="/customer/new">
            <IconButton>add_circle</IconButton>
          </Link>
        </Typography>
        <TicketList tickets={ticketList} />
      </Fragment>
    );
  } else {
    return null;
  }

}
