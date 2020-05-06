import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TicketListItem from './ticket-list-item';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function TicketList(props) {
  const classes = useStyles();
  const tickets = props.tickets;
  return (
    <List className={classes.root}>
      {tickets.map((ticket, index) => (
        <ListItem disableGutters key={index}>
          <TicketListItem ticket={ticket}/>
        </ListItem>
      ))}
    </List>
  );
}
