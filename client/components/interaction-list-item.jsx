import React, { Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ApplicationContext from '../lib/context';

const useStyles = makeStyles({
  root: {
    minWidth: '100%',
    backgroundColor: '#fefefa'
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

export default function InteractionListItem(props) {
  const classes = useStyles();
  const context = useContext(ApplicationContext);
  const date = new Date(props.interaction.timeCreated);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    fetch('/api/interactions/' + props.interaction.interactionId, {
      method: 'DELETE'
    })
      .then(result => {
        setOpen(false);
        props.getCustomers();
        context.openSnackbar('Interaction successfully deleted');
      })
      .catch(error => console.error('Fetch failed!', error));

  };

  return (
    <Fragment>
      <Card className={classes.root} onClick={handleClickOpen} elevation={4}>
        <CardContent className={classes.card}>
          <Grid container className={classes.root} spacing={1}>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={6}>
                <Typography className={classes.text} color="textSecondary">
              Date: {date.toDateString()}
                </Typography>
              </Grid>
              <Grid item xs={6} align='right'>
                <Typography className={classes.text} color="textSecondary">
              Time: {date.toTimeString().substring(0, 5)}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={12}>
                <Typography className={classes.text} color="textSecondary" noWrap>
              Notes: {props.interaction.notes}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Date: {date.toDateString()} <br />
            Time: {date.toTimeString().substring(0, 5)} <br />
            Type: {props.interaction.type} <br />
            Notes: {props.interaction.notes}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            DELETE
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
          Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
