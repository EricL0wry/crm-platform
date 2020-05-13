import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InteractionListItem from './interaction-list-item';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: '0'
  },
  text: {
    fontSize: 14
  }
}));

export default function InteractionList(props) {
  const interactions = props.interactions;
  const classes = useStyles();
  return (
    <Fragment>
      <List className={classes.root} style={{ textDecoration: 'none' }}>
        {interactions.map((interaction, index) => (
          <ListItem disableGutters key={index} className={classes.listItem} >
            <InteractionListItem interaction={interaction}
              customerId={props.customerId}
              getCustomers={props.getCustomers}/>
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
}
