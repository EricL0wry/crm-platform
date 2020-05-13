import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { phoneNumberFormater } from '../lib/helper-functions';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles(theme => ({
  grey: {
    backgroundColor: theme.background.lightgrey
  },
  list: {
    padding: '4%, 0',
    width: '96%'
  },
  text: {
    paddingLeft: '4%'
  },
  card: {
    backgroundColor: '#fefefa',
    marginBottom: '2rem'
  }
}));

export default function CustomerInfo(props) {
  const classes = useStyles();
  const customerInfo = props.customerInfo;
  return (
    <Card className={classes.card} elevation={4}>
      <List className={classes.list}>
        <Grid container spacing={1}>
          <Grid className={classes.grey} item xs={4}>
            <Typography className={classes.text} color="textPrimary">
              Name
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.text} color="textPrimary">
              {customerInfo.firstName + ' ' + customerInfo.lastName}
            </Typography>
          </Grid>
          <Grid className={classes.grey} item xs={4}>
            <Typography className={classes.text} color="textPrimary">
              Street
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.text} color="textPrimary">
              {customerInfo.addressStreet}
            </Typography>
          </Grid>
          <Grid className={classes.grey} item xs={4}>
            <Typography className={classes.text} color="textPrimary">
              City/State
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.text} color="textPrimary">
              {customerInfo.addressCity +
                ', ' +
                customerInfo.addressState +
                ', ' +
                customerInfo.addressZip}
            </Typography>
          </Grid>
          <Grid className={classes.grey} item xs={4}>
            <Typography className={classes.text} color="textPrimary">
              Phone
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.text} color="textPrimary">
              {phoneNumberFormater(customerInfo.phoneNumber)}
            </Typography>
          </Grid>
          <Grid className={classes.grey} item xs={4}>
            <Typography className={classes.text} color="textPrimary">
              Email
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.text} color="textPrimary">
              {customerInfo.email}
            </Typography>
          </Grid>
          <Grid className={classes.grey} item xs={4}>
            <Typography className={classes.text} color="textPrimary">
              Company
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.text} color="textPrimary">
              {customerInfo.companyName}
            </Typography>
          </Grid>
          <Grid className={classes.grey} item xs={4}>
            <Typography className={classes.text} color="textPrimary">
              Title
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.text} color="textPrimary">
              {customerInfo.jobTitle}
            </Typography>
          </Grid>
        </Grid>
      </List>
    </Card>
  );
}
