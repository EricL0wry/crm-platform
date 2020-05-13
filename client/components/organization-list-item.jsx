import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { phoneNumberFormater } from '../lib/helper-functions';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    backgroundColor: '#fefefa'
  },
  text: {
    fontSize: 14
  },
  icon: {
    fontSize: 20
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
  const { firstName, lastName, phoneNumber, email } = props.member;

  return (
    <Card className={classes.root} elevation={4}>
      <CardContent className={classes.card}>
        <Grid container alignItems="center">
          <Grid item xs={1}>
            <Icon>accessibility</Icon>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.text} color="textSecondary">
              {`${firstName} ${lastName}`}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Icon className={classes.icon}>phone</Icon>
            <Icon className={classes.icon}>email</Icon>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.text} color="textSecondary">
              {phoneNumberFormater(phoneNumber)}
            </Typography>
            <Typography className={classes.text} color="textSecondary">
              {email}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
