import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CustomerListItem from './customer-list-item';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function CustomerList(props) {
  const classes = useStyles();
  const customers = props.customers;
  return (
    <List className={classes.root} style={{ textDecoration: 'none' }}>
      {customers.map((customer, index) => (
        <ListItem disableGutters key={index}>
          <CustomerListItem customer={customer} />
        </ListItem>
      ))}
    </List>
  );
}
