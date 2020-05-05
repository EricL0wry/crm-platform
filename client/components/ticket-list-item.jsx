import React, { useContext } from 'react';
import AppContext from '../lib/context';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: '100%'
  },
  text: {
    fontSize: 14
  },
  card: {
    padding: '8px',
    '&:last-child': {
      padding: '8px'
    }
  }
});

export default function TicketListItem() {
  const classes = useStyles();
  const context = useContext(AppContext);
  return (
    <Card className={classes.root} onClick={null}>
      <CardContent className= {classes.card}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography className={classes.text} color="textSecondary" >
              TKT: {1001}
            </Typography>
            <Typography className={classes.text} color="textSecondary" >
              Name: {'Will Billiamson'}
            </Typography>
            <Typography className={classes.text} color="textSecondary" >
              Task: {'Send Quote'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className={classes.text} color="textSecondary" >
              Priority: {'High'}
            </Typography>
            <Typography className={classes.text} color="textSecondary" >
              Due: {'05/05/20'}
            </Typography>
            <Typography className={classes.text} color="textSecondary" >
              Created by: {'Tim'}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
