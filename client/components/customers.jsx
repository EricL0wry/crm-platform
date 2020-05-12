import React, { useContext, useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core';
import AppContext from '../lib/context';
import CustomerList from './customer-list';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  titleStyles: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    marginLeft: theme.spacing(1.5)
  }
}));

export default function Customers() {
  const context = useContext(AppContext);
  const userId = context.getUser().userId;
  const classes = useStyles();
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    fetch('/api/customerlist/' + userId)
      .then(response => response.json())
      .then(data => {
        setCustomerList(data);
      })
      .catch(error => console.error('Fetch failed!', error));
  }, []);

  return (
    <Fragment>
      <Box display='flex' alignItems='center'>
        <Box p={0} flexGrow={1}>
          <Typography className={classes.titleStyles}
            variant="h4">
            My Customers
          </Typography>
        </Box>
        <Box mr={1.5}>
          <Link to="/customer/new">
            <IconButton>add_circle</IconButton>
          </Link>
        </Box>
      </Box>
      <CustomerList customers={customerList} />
    </Fragment>
  );
}
