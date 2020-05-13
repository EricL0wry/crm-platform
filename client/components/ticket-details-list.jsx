import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => {
  return {
    list: {
      padding: '0 2%',
      width: '96%'
    },
    grey: {
      backgroundColor: theme.background.darkgrey
    },
    avatar: {
      width: theme.spacing(11),
      height: theme.spacing(11)
    },
    involved: {
      marginBottom: theme.spacing(2)
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
    custImagePath,
    assigneeFirstName,
    assigneeLastName,
    assigneeImagePath,
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
    <Fragment>
      <Grid container spacing={4} className={classes.involved}>
        <Grid container item xs={6} direction="column" alignItems="center">
          <Typography>
            Assigned to
          </Typography>
          <Avatar
            className={classes.avatar}
            alt="assignee"
            src={assigneeImagePath || '/images/users/placeholder.png'}
          />
          <Typography>
            {`${assigneeFirstName} ${assigneeLastName}`}
          </Typography>
        </Grid>
        <Grid container item xs={6} direction="column" alignItems="center">
          <Typography>
            Customer
          </Typography>
          <Avatar
            className={classes.avatar}
            alt="customer"
            src={custImagePath || '/images/users/placeholder.png'}
          />
          <Typography>
            {`${custFirstName} ${custLastName}`}
          </Typography>
        </Grid>
      </Grid>
      <List className={classes.list}>
        <Grid container spacing={3}>
          <Grid className={classes.grey} item xs={4}>
            <Typography>
              Ticket #
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              {('0000' + number).slice(-4)}
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
              {!startDate ? startDate : startDate.substring(0, 10)}
            </Typography>
          </Grid>
          <Grid className={classes.grey} item xs={4}>
            <Typography>
              Due Date
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              {!dueDate ? 'No Due Date' : dueDate.substring(0, 10)}
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
}
