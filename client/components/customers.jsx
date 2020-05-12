import React, { useContext, useEffect, useState, Fragment } from 'react';
import AppContext from '../lib/context';
import CustomerList from './customer-list';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    icon: {
      color: theme.palette.primary.light
    }
  };
});

export default function Customers() {
  const classes = useStyles();
  const context = useContext(AppContext);
  const userId = context.getUser().userId;
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
          <Typography variant="h4">
        My Customers
          </Typography>
        </Box>
        <Box mr={1}>
          <Link to="/customer/new">
            <IconButton className={classes.icon}>add_circle</IconButton>
          </Link>
        </Box>
      </Box>
      <CustomerList customers={customerList} />
    </Fragment>
  );
}
