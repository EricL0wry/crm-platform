import React, { useContext } from 'react';
import AppContext from '../lib/context';
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

export default function TicketList() {
  const classes = useStyles();
  const context = useContext(AppContext);

  return (
    <List className={classes.root}>
      <ListItem disableGutters>
        <TicketListItem />
      </ListItem>
      <ListItem disableGutters>
        <TicketListItem />
      </ListItem>
      <ListItem disableGutters>
        <TicketListItem />
      </ListItem>
      <ListItem disableGutters>
        <TicketListItem />
      </ListItem>
      <ListItem disableGutters>
        <TicketListItem />
      </ListItem>
    </List>
  );
}
