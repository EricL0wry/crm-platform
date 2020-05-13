import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
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
      minHeight: '375px',
      objectFit: 'contain'
    },
    grey: {
      backgroundColor: theme.background.darkgrey
    },
    icon: {
      color: theme.palette.primary.light
    },
    title: {
      margin: theme.spacing(2)
    }
  };
});

export default function MapDialog(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  if (props.locationData !== null) {
    const {
      addressCity: city,
      addressState: state,
      addressStreet: street,
      addressZip: zip,
      firstName,
      lastName
    } = props.locationData.userInfo;
    const { googleUrl, mapUrl } = props.locationData;

    return (
      <div>
        <IconButton onClick={handleClickOpen} className={classes.icon}>{props.icon}</IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          className={classes.dialog}
        >
          <Box>
            <Typography variant="h4" className={classes.title}>
              Location
            </Typography>
          </Box>
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
                    {firstName} {lastName}
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
                    {street}
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
                    {city}, {state} {zip}
                  </Typography>
                </Grid>
              </Grid>
            </List>
          </DialogContent>
          <img className={classes.mapImg} src={mapUrl} alt="Customer Location Map" />
          <DialogActions>
            <Button color="primary" href={googleUrl} target="_blank" autoFocus>
            Google
            </Button>
            <Button onClick={handleClose} color="primary">
            Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return null;
  }
}
