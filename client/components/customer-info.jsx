import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  grey: {
    backgroundColor: theme.background.darkgrey
  },
  list: {
    padding: '0 2%',
    width: '96%'
  }
}));

export default function CustomerInfo(props) {
  const classes = useStyles();
  const customerInfo = props.customerInfo;
  return (
    <List className={classes.list}>
      <Grid container spacing={1}>
        <Grid className={classes.grey} item xs={4}>
          <Typography className={classes.text} color="textSecondary" >
              Name
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.text} color="textSecondary" >
            {customerInfo.firstName + ' ' + customerInfo.lastName}
          </Typography>
        </Grid>
        <Grid className={classes.grey} item xs={4}>
          <Typography className={classes.text} color="textSecondary" >
              Street
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.text} color="textSecondary" >
            {customerInfo.addressStreet}
          </Typography>
        </Grid>
        <Grid className={classes.grey} item xs={4}>
          <Typography className={classes.text} color="textSecondary" >
              City/State
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.text} color="textSecondary" >
            {customerInfo.addressCity + ', ' + customerInfo.addressState + ', ' + customerInfo.addressZip}
          </Typography>
        </Grid>
        <Grid className={classes.grey} item xs={4}>
          <Typography className={classes.text} color="textSecondary" >
              Phone
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.text} color="textSecondary" >
            {customerInfo.phoneNumber}
          </Typography>
        </Grid>
        <Grid className={classes.grey} item xs={4}>
          <Typography className={classes.text} color="textSecondary" >
              Email
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.text} color="textSecondary" >
            {customerInfo.email}
          </Typography>
        </Grid>
        <Grid className={classes.grey} item xs={4}>
          <Typography className={classes.text} color="textSecondary" >
              Company
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.text} color="textSecondary" >
            {customerInfo.companyName}
          </Typography>
        </Grid>
        <Grid className={classes.grey} item xs={4}>
          <Typography className={classes.text} color="textSecondary" >
              Title
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.text} color="textSecondary" >
            {customerInfo.jobTitle}
          </Typography>
        </Grid>
      </Grid>
    </List>
  );
}
