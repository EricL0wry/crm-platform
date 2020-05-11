import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: '100%'
  },
  text: {
    fontSize: 14
  },
  card: {
    padding: '8px',
    '&:last-child': {
      padding: '8px'
    }
  }
});

export default function TicketListItem(props) {
  const classes = useStyles();
  const priorities = ['', 'Hign', 'Medium', 'Low'];
  const ticket = props.ticket;
  return (
    <Link
      to={`/ticket/${ticket.ticketId}`}
      style={{ textDecoration: 'none', minWidth: '100%' }}
    >
      <Card className={classes.root} onClick={null}>
        <CardContent className={classes.card}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography className={classes.text} color="textSecondary">
                TKT: {('0000' + ticket.ticketId).slice(-4)}
              </Typography>
              <Typography className={classes.text} color="textSecondary">
                Name: {ticket.firstName + ' ' + ticket.lastName}
              </Typography>
              <Typography className={classes.text} color="textSecondary">
                Task: {ticket.description}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.text} color="textSecondary">
                Priority: {priorities[ticket.priority]}
              </Typography>
              <Typography className={classes.text} color="textSecondary">
                Due: {ticket.dueDate ? new Date(ticket.dueDate).toDateString() : 'No Due Date'}
              </Typography>
              <Typography className={classes.text} color="textSecondary">
                Created by: {ticket.ownerFirstName + ' ' + ticket.ownerLastName}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}
