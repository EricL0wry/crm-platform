import React from 'react';
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

export default function Weather(props) {
  const classes = useStyles();
  const d = new Date();
  const n = d.getDay();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[n];
  const icon = props.weather.weather[0].icon;
  const url = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={3} justify="space-between">
          <Grid item xs={12}>
            <Typography className={classes.header} color="textSecondary">
              Good Morning <br />{props.userInfo.firstName}
            </Typography>
            <Typography className={classes.text} color="textSecondary">
              Here is the current weather information at {props.weather.name}
            </Typography>
          </Grid>
          <Grid className= {classes.marginAutoItem} item xs={4}>
            <Avatar alt="" src={url} className={classes.marginAutoItem}/>
            <Typography className={classes.text} color="textSecondary">
              {day}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
