import React, { useContext } from 'react';
import AppContext from '../lib/context';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    minHeight: 200
  },
  header: {
    fontSize: 30,
    textAlign: 'center'
  },
  text: {
    fontSize: 14,
    textAlign: 'center'
  },
  marginAutoItem: {
    margin: 'auto'
  }

});

export default function Weather() {
  const classes = useStyles();
  const context = useContext(AppContext);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={3} justify="space-between">
          <Grid item xs={12}>
            <Typography className={classes.header} color="textSecondary">
              Good Morning <br />{'John'}
            </Typography>
            <Typography className={classes.text} color="textSecondary">
              Here is the weather for the next 3 days
            </Typography>

          </Grid>
          <Grid item xs={4}>
            <Avatar alt="" src="https://openweathermap.org/img/wn/01d@2x.png" className={classes.marginAutoItem}/>
            <Typography className={classes.text} color="textSecondary">
              {'Monday'}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Avatar alt="" src="https://openweathermap.org/img/wn/01d@2x.png" className={classes.marginAutoItem}/>
            <Typography className={classes.text} color="textSecondary">
              {'Tuesday'}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Avatar alt="" src="https://openweathermap.org/img/wn/03n@2x.png" className={classes.marginAutoItem} />
            <Typography className={classes.text} color="textSecondary" >
              {'Wednesday'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
