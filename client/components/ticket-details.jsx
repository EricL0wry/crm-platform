import React, { Fragment, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/Icon';
import TicketDetailList from './ticket-details-list';

const useStyles = makeStyles(theme => {
  return {
    title: {
      marginTop: '14px',
      marginBottom: '14px'
    },
    edit: {
      marginRight: '10px'
    }
  };
});

export default function TicketDetails(props) {
  // const {ticketId} = props;
  const ticketId = 7;
  const classes = useStyles();
  const [ticketData, setTicketData] = useState(null);

  useEffect(() => {
    fetch(`/api/ticket/${ticketId}`)
      .then(response => response.json())
      .then(ticket => {
        setTicketData(ticket);
      })
      .catch(error => console.error('unable to fetch customer data', error));
  }, []);

  if (ticketData === null) {
    return null;
  } else {
    return (
      <Fragment>
        <Box display='flex' alignItems='center' justifyContent='space-between' >
          <Typography variant="h4" className={classes.title}>
            Ticket Details
          </Typography>
          <IconButton className={classes.edit}>edit</IconButton>
        </Box>
        <TicketDetailList ticketData={ticketData} />
      </Fragment>
    );
  }
}
