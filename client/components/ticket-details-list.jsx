import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => {
  return {
    list: {
      padding: '0 2%',
      width: '96%'
    },
    grey: {
      backgroundColor: theme.background.darkgrey
    }
  };
});

export default function TicketDetailsList(props) {
  const { ticketData } = props;
  const classes = useStyles();
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

  return (
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
            {startDate}
          </Typography>
        </Grid>
        <Grid className={classes.grey} item xs={4}>
          <Typography>
            Due Date
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography>
            {dueDate}
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
  );
}
