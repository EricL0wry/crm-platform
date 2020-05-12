import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core';
import AppContext from '../lib/context';
import TicketList from './ticket-list';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  titleStyles: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    marginLeft: theme.spacing(1.5)
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
        <Box display='flex' alignItems='center'>
          <Box p={0} flexGrow={1}>
            <Typography className={classes.titleStyles}
              variant="h4">
          Tickets
            </Typography>
          </Box>
          <Box mr={1.5}>
            <Link to="/ticket/new">
              <IconButton>add_circle</IconButton>
            </Link>
          </Box>
        </Box >
        <TicketList tickets={ticketList} />
      </Fragment>
    );
  } else {
    return null;
  }

}
