import React, { Fragment, useState, useEffect, useContext } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppContext from '../lib/context';
import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  appBarStyles: {
    marginBottom: '20px'
  },
  avatarStyles: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  }
}));

export default function Profile(props) {
  const classes = useStyles();
  const context = useContext(AppContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`/api/users/${context.getUser().userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
      });
  }, []);

  const {
    firstName,
    lastName,
    companyName,
    jobTitle,
    phoneNumber,
    email
  } = user;

  const handleLogout = () => {
    context.onLogout();
    props.history.push('/');
  };

  return (
    <div className="container">
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid className="classes.titleStyles" item>
          <Box m={3}>
            <Typography component="span" variant="h3" color="textPrimary">
              My Profile
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Avatar
            className={classes.avatarStyles}
            alt="default"
            src="/images/default-user-img.JPG"
          />
        </Grid>
      </Grid>

      <Grid container direction="column">
        <Grid item>
          <List className="classes.listStyles">
            <ListItem className={classes.root}>
              <ListItemText
                primary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="h6"
                      color="textPrimary"
                    >
                      Name
                    </Typography>
                  </Fragment>
                }
                secondary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="h5"
                      color="textPrimary"
                    >
                      {firstName + ' ' + lastName}
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
            <ListItem className={classes.root}>
              <ListItemText
                primary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="h6"
                      color="textPrimary"
                    >
                      Company
                    </Typography>
                  </Fragment>
                }
                secondary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="h5"
                      color="textPrimary"
                    >
                      {companyName}
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
            <ListItem className={classes.root}>
              <ListItemText
                primary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="h6"
                      color="textPrimary"
                    >
                      Job Title
                    </Typography>
                  </Fragment>
                }
                secondary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="h5"
                      color="textPrimary"
                    >
                      {jobTitle}
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
            <ListItem className={classes.root}>
              <ListItemText
                primary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="h6"
                      color="textPrimary"
                    >
                      Phone
                    </Typography>
                  </Fragment>
                }
                secondary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="h5"
                      color="textPrimary"
                    >
                      {phoneNumber}
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
            <ListItem className={classes.root}>
              <ListItemText
                primary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="h6"
                      color="textPrimary"
                    >
                      Email
                    </Typography>
                  </Fragment>
                }
                secondary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="h5"
                      color="textPrimary"
                    >
                      {email}
                    </Typography>
                  </Fragment>
                }
              />
            </ListItem>
          </List>
        </Grid>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="secondary"
          context=""
        >
          Log Out
        </Button>
      </Grid>
    </div>
  );
}
