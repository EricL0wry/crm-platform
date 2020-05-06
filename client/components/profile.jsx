import React, { Fragment, useState, useEffect, useContext } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuAppBar from './menu-app-bar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppContext from '../lib/context';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingTop: '0',
    paddingBottom: '0',
    margin: '0'
  },
  avatarStyles: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  }
}));

export default function Profile(props) {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('/api/users/1')
      .then(res => res.json())
      .then(data => {
        setUser(data);
      });
  });
  if (!user) {
    return null;
  }
  const {
    firstName,
    lastName,
    companyName,
    jobTitle,
    phoneNumber,
    email
  } = user;
  const classes = useStyles();
  const context = useContext(AppContext);

  return (
    <div className="container classes.root">
      <MenuAppBar />
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <Typography component="span" variant="h5" color="textPrimary">
            My Profile
          </Typography>
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
                      variant="subtitle1"
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
                      variant="h6"
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
                      variant="subtitle1"
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
                      variant="h6"
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
                      variant="subtitle1"
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
                      variant="h6"
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
                      variant="subtitle1"
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
                      variant="h6"
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
                      variant="subtitle1"
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
                      variant="h6"
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
          onClick={context.onLogout}
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
