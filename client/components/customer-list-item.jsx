import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import { phoneNumberFormater } from '../lib/helper-functions';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '100%',
    backgroundColor: '#fefefa'
  },
  text: {
    fontSize: 14
  },
  icon: {
    fontSize: 20,
    marginRight: '4px'
  },
  card: {
    width: '100%',
    padding: '8px',
    '&:last-child': {
      padding: '8px'
    }
  },
  avatar: {
    width: '90%',
    height: '100%'
  }
}));

export default function CustomerListItem(props) {
  const classes = useStyles();
  const customer = props.customer;
  return (
    <Link to={`/customers/${customer.customerId}`} style={{ textDecoration: 'none', minWidth: '100%' }}>
      <Card className={classes.root} onClick={null} elevation={4}>
        <CardContent className={classes.card}>
          <Grid container alignItems="center" spacing={3} justify="space-between">
            <Grid container item xs={3} sm={1} justify="center">
              <Avatar
                className={classes.avatar}
                alt="customer"
                src={customer.imagePath || '/images/users/placeholder.png'}
              />
            </Grid>
            <Grid container item xs={9} sm={2} direction="column" spacing={1}>
              <Grid container item>
                <Icon className={classes.icon}>person</Icon>
                <Typography className={classes.text} color="textSecondary" >
                  {customer.firstName + ' ' + customer.lastName}
                </Typography>
              </Grid>

              <Grid container item>
                <Icon className={classes.icon}>phone</Icon>
                <Typography className={classes.text} color="textSecondary" >
                  {phoneNumberFormater(customer.phoneNumber)}
                </Typography>
              </Grid>
              <Grid container item>
                <Icon className={classes.icon}>email</Icon>
                <Typography className={classes.text} color="textSecondary" >
                  {customer.email}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}
