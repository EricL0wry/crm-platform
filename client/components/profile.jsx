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
}
