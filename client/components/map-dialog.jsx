import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/Icon';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

const useStyles = makeStyles(theme => {
  return {
    dialog: {
      minHeight: '663px'
    },
    mapImg: {
      width: '100%',
      objectFit: 'contain'
    },
    grey: {
      backgroundColor: theme.background.darkgrey
    }
  };
});

export default function MapDialog(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleClickOpen}>{props.icon}</IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="location-title"
        aria-describedby="location-dialog-description"
        fullWidth
        className={classes.dialog}
      >
        <DialogTitle id="location-title" >
          <Box>
            <Typography variant="h4">
              Location
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>

          <List>
            <Grid container spacing={2}>
              <Grid className={classes.grey} item xs={4}>
                <Box display='flex' alignItems='center' height='100%'>
                  <Typography>
                    Name
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Typography>
                    Will Billiamson
                </Typography>
              </Grid>
              <Grid className={classes.grey} item xs={4}>
                <Box display='flex' alignItems='center' height='100%'>
                  <Typography>
                    Street
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Typography>
                  12345 Bill Avenue
                </Typography>
              </Grid>
              <Grid className={classes.grey} item xs={4}>
                <Box display='flex' alignItems='center' height='100%'>
                  <Typography>
                    City/State
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Typography>
                  New York, NY, 12345
                </Typography>
              </Grid>
            </Grid>
          </List>
        </DialogContent>
        <img className={classes.mapImg} src="https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=290x375&markers=size:mid%7Ccolor:red%7Clabel:W%7C%229200%20Irvine%20Center%20Dr.,%20Irvine,%20CA,%2092618%22&center=%229200%20Irvine%20Center%20Dr.,%20Irvine,%20CA,%2092618%22&key=AIzaSyDrfcCNcukCbWUX1qpoa6g42UOG7f0i550" alt="Customer Location Map" />

        <DialogActions>
          <Button color="primary" autoFocus>
            Google
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
