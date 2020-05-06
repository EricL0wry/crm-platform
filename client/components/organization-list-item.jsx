import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
  root: {
    minWidth: '100%'
  },
  text: {
    fontSize: 14
  },
  card: {
    width: '100%',
    padding: '8px',
    '&:last-child': {
      padding: '8px'
    }
  }
});

export default function OrganizationListItem(props) {
  const classes = useStyles();
  const { member } = props;

  return (
    <Card className={classes.root}>
      <Typography>
        {member.firstName}
      </Typography>
    </Card>
  );
}
