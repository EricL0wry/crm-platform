import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Icon';
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
