import React from 'react';
import OrganizationListItem from './organization-list-item';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper
    }
  };
});

export default function OrganizationList(props) {
  const classes = useStyles();
  const { orgData } = props;
  const orgList = orgData.map(member => {
    return (
      <ListItem disableGutters key={member.userId}>
        <OrganizationListItem member={member} />
      </ListItem>
    );
  });

  return (
    <List className={classes.root} style={{ textDecoration: 'none' }}>
      {orgList}
    </List>
  );
}
