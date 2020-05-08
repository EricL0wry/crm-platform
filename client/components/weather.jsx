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
    minHeight: 180
  },
  cardContent: {
    padding: '4px',
    '&:last-child': {
      padding: '4px'
    }
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
  const today = days[n];
  let second = '';
  let third = '';
  if (n === 6) {
    second = days[0];
    third = days[1];
  } else if (n === 5) {
    second = days[6];
    third = days[0];
  } else {
    second = days[n + 1];
    third = days[n + 2];
  }
  const icon = props.weather.weather[0].icon;
  const icon2 = props.forcast.list[6].weather[0].icon;
  const icon3 = props.forcast.list[14].weather[0].icon;
  const url = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
  const url2 = 'https://openweathermap.org/img/wn/' + icon2 + '@2x.png';
  const url3 = 'https://openweathermap.org/img/wn/' + icon3 + '@2x.png';
  const weather = props.weather.weather[0].description;
  const weather2 = props.forcast.list[6].weather[0].description;
  const weather3 = props.forcast.list[14].weather[0].description;
  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
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
              {weather} <br />
              {today}
            </Typography>
          </Grid>
          <Grid className={classes.marginAutoItem} item xs={4}>
            <Avatar alt="" src={url2} className={classes.marginAutoItem} />
            <Typography className={classes.text} color="textSecondary">
              {weather2} <br />
              {second}
            </Typography>
          </Grid>
          <Grid className={classes.marginAutoItem} item xs={4}>
            <Avatar alt="" src={url3} className={classes.marginAutoItem} />
            <Typography className={classes.text} color="textSecondary">
              {weather3} <br />
              {third}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
