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
    minHeight: 180,
    backgroundColor: '#fefefa'
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

const temp2days = list => {
  const dayTemp = [];
  const dayIcon = [];
  let counter = 0;
  let dayNum = 0;

  for (let i = 1; i < list.length; i++) {
    if (counter === 0) {
      dayTemp.push(list[i].main.temp);
      dayIcon.push(list[i].weather[0].icon);
    } else {
      if (list[i].main.temp > dayTemp[dayNum]) {
        dayTemp[dayNum] = list[i].main.temp;
        dayIcon[dayNum] = list[i].weather[0].icon;

      }
    }
    counter++;
    if (counter === 8) {
      counter = 0;
      dayNum++;
    }
  }
  return [dayTemp, dayIcon];
};

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

  const [dayTemp, dayIcon] = temp2days(props.forcast.list);
  const url = dayIcon.map(icon => ('https://openweathermap.org/img/wn/' + icon + '@2x.png'));
  return (
    <Card className={classes.root} elevation={4}>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={3} justify="space-between">
          <Grid item xs={12}>
            <Typography className={classes.header} color="textPrimary">
              Good Morning <br />{props.userInfo.firstName}
            </Typography>
            <Typography className={classes.text} color="textPrimary">
              Here is the current weather information at {props.forcast.city.name}
            </Typography>
          </Grid>
          <Grid className= {classes.marginAutoItem} item xs={4}>
            <Avatar alt="" src={url[0]} className={classes.marginAutoItem}/>
            <Typography className={classes.text} color="textSecondary">
              {Math.round(dayTemp[0])}<span>&#8457;</span> <br />
              {today}
            </Typography>
          </Grid>
          <Grid className={classes.marginAutoItem} item xs={4}>
            <Avatar alt="" src={url[1]} className={classes.marginAutoItem} />
            <Typography className={classes.text} color="textSecondary">
              {Math.round(dayTemp[1])}<span>&#8457;</span> <br />
              {second}
            </Typography>
          </Grid>
          <Grid className={classes.marginAutoItem} item xs={4}>
            <Avatar alt="" src={url[2]} className={classes.marginAutoItem} />
            <Typography className={classes.text} color="textSecondary">
              {Math.round(dayTemp[2])}<span>&#8457;</span><br />
              {third}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
