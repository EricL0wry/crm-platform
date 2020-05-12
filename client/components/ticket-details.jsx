import React, { Fragment, useEffect, useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/Icon';
import TicketDetailList from './ticket-details-list';
import { useParams, Link, useHistory } from 'react-router-dom';
import ApplicationContext from '../lib/context';
import AlertDialog from './alert-dialog';

const useStyles = makeStyles(theme => {
  return {
    title: {
      marginTop: '14px',
      marginBottom: '14px'
    },
    edit: {
      marginRight: '10px'
    },
    icon: {
      color: theme.palette.primary.light
    }
  };
});

export default function TicketDetails(props) {
  const { ticketId } = useParams();
  const classes = useStyles();
  const [ticketData, setTicketData] = useState(null);
  const history = useHistory();
  const context = useContext(ApplicationContext);

  useEffect(() => {
    fetch(`/api/ticket/${ticketId}`)
      .then(response => response.json())
      .then(ticket => {
        setTicketData(ticket);
      })
      .catch(error => console.error('unable to fetch customer data', error));
  }, []);

  const handleDelete = () => {
    fetch('/api/tickets/' + ticketId, {
      method: 'DELETE'
    }).then(response => {
      if (response.status === 204) {
        history.push('/tickets');
        context.openSnackbar('Ticket successfully deleted!');
      } else {
        context.openSnackbar('Ticket successfully deleted!');
        throw new Error('Fetch failed!');
      }
    })
      .catch(error => console.error(error));
  };

  if (ticketData === null) {
    return null;
  } else {
    return (
      <Fragment>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box p={0} flexGrow={1}>
            <Typography variant="h4" className={classes.title}>
            Ticket Details
            </Typography>
          </Box>
          <Box mr={1}>
            <Link to={`/ticket/edit/${ticketId}`}>
              <IconButton className={classes.icon}>edit</IconButton>
            </Link>
          </Box>
          <Box mr={1}>
            <AlertDialog icon='delete'
              title='Are you sure you want to delete this ticket?'
              do={handleDelete} />
          </Box>
        </Box>
        <TicketDetailList ticketData={ticketData} />
        <Link to={'/tickets'}
          style={{ textDecoration: 'none', minWidth: '100%' }}>
          <Typography variant="h5" className={classes.title}>
            Back
          </Typography>
        </Link>
      </Fragment>
    );
  }
}
