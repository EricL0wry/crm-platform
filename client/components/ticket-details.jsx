import React, { Fragment, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/Icon';
import TicketDetailList from './ticket-details-list';

const useStyles = makeStyles(theme => {
  return {
    title: {
      marginTop: '14px',
      marginBottom: '14px'
    },
    list: {
      padding: '0 2%',
      width: '96%'
    },
    grey: {
      backgroundColor: theme.background.darkgrey
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
  const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    fetch(`/api/ticket/${ticketId}`)
      .then(response => response.json())
      .then(ticket => {
        setTicketData(ticket);
      })
      .catch(error => console.error('unable to fetch customer data', error));
  }, []);

  const {
    ticketId: number,
    custFirstName,
    custLastName,
    assigneeFirstName,
    assigneeLastName,
    priority,
    startDate,
    dueDate,
    description,
    status,
    ownerFirstName,
    ownerLastName,
    details

  } = ticketData;

  if (!ticketData.length) {
    return (
      <Fragment>
        <Box display='flex' alignItems='center' justifyContent='space-between' >
          <Typography variant="h4" className={classes.title}>
          Ticket Details
          </Typography>
          <IconButton className={classes.edit}>edit</IconButton>
        </Box>
        <List className={classes.list}>
          <Grid container spacing={1}>
            <Grid className={classes.grey} item xs={4}>
              <Typography>
                Ticket Number
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {('0000' + number).slice(-4)}
              </Typography>
            </Grid>
            <Grid className={classes.grey} item xs={4}>
              <Typography>
                Customer
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {custFirstName} {custLastName}
              </Typography>
            </Grid>
            <Grid className={classes.grey} item xs={4}>
              <Typography>
                Assigned To
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {assigneeFirstName} {assigneeLastName}
              </Typography>
            </Grid>
            <Grid className={classes.grey} item xs={4}>
              <Typography>
                Opened By
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {ownerFirstName} {ownerLastName}
              </Typography>
            </Grid>
            <Grid className={classes.grey} item xs={4}>
              <Typography>
                Priority
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {priority}
              </Typography>
            </Grid>
            <Grid className={classes.grey} item xs={4}>
              <Typography>
                Status
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {status}
              </Typography>
            </Grid>
            <Grid className={classes.grey} item xs={4}>
              <Typography>
                Start Date
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {startDate.substring(0, 10)}
              </Typography>
            </Grid>
            <Grid className={classes.grey} item xs={4}>
              <Typography>
                Due Date
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {dueDate.substring(0, 10)}
              </Typography>
            </Grid>
            <Grid className={classes.grey} item xs={4}>
              <Box display='flex' alignItems='center' height='100%'>
                <Typography>
                  Description
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {description}
              </Typography>
            </Grid>
            <Grid className={classes.grey} item xs={4}>
              <Box display='flex' alignItems='center' height='100%'>
                <Typography>
                  Details
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Typography>{details}</Typography>
            </Grid>

          </Grid>
        </List>
      </Fragment>
    );
  } else {
    return null;
  }
}
