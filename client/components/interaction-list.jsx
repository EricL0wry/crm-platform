import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomerList from './customer-list';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InteractionListItem from './interaction-list-item';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '100%',
    backgroundColor: theme.background.darkgrey
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
      <Typography variant="h4">
        Interactions
        <IconButton>add_circle</IconButton>
      </Typography>

      <List className={classes.root} style={{ textDecoration: 'none' }}>
        {interactions.map((interaction, index) => (
          <ListItem disableGutters key={index}>
            <InteractionListItem interaction={interaction} />
          </ListItem>
        ))}
      </List>

    </Fragment>
  );
}
