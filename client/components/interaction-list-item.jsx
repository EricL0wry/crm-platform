import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';\

const useStyles = makeStyles({
  root: {
  },
  text: {
    fontSize: 14
  }
});

export default function InteractionListItem(props) {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container className={classes.root} spacing={1}>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={6}>
            <Typography className={classes.text} color="textSecondary">
              Date: {props.interaction.timeCreated.substring(0, 10)}
            </Typography>
          </Grid>
          <Grid item xs={6} align='right'>
            <Typography className={classes.text} color="textSecondary">
              Time: {props.interaction.timeCreated.substring(11, 19)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={12}>
            <Typography className={classes.text} color="textSecondary" >
              Notes: {props.interaction.notes}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
}
