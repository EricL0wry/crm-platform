import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
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

export default function CustomerListItem(props) {
  const classes = useStyles();
  const customer = props.customer;
  return (
    <Link to={`/customers/${customer.customerId}`} style={{ textDecoration: 'none', minWidth: '100%' }}>
      <Card className={classes.root} onClick={null}>
        <CardContent className={classes.card}>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <Icon>accessibility</Icon>
            </Grid>
            <Grid item xs={5}>
              <Typography className={classes.text} color="textSecondary" >
                Name: {customer.firstName + ' ' + customer.lastName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.text} color="textSecondary" >
                Phone: {customer.phoneNumber}
              </Typography>
              <Typography className={classes.text} color="textSecondary" >
                Email: {customer.email}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}
