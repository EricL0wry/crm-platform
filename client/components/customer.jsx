import React, { useEffect, useState, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Icon';
import { Link, useParams, useHistory } from 'react-router-dom';
import CustomerInfo from './customer-info';
import InteractionList from './interaction-list';
import AlertDialog from './alert-dialog';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    title: {
    }
  };
});

export default function Customer() {
  const classes = useStyles();
  const [customerData, setCustomerData] = useState(null);
  const { customerId } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch('/api/customers/' + customerId)
      .then(response => response.json())
      .then(data => {
        setCustomerData(data);
      })
      .catch(error => console.error('Fetch failed!', error));
  }, []);

  const handleDelete = () => {
    fetch('/api/customers/' + customerId, {
      method: 'DELETE'
    })
      .catch(error => console.error('Fetch failed!', error));
    history.push('/customers');
  };

  if (customerData !== null) {
    return (
      <Fragment>
        <Box display='flex' alignItems='center' >
          <Box p={0} flexGrow={1}>
            <Typography variant="h4" className={classes.title}>
            Customer Info
            </Typography>
          </Box>
          <IconButton>map</IconButton>
          <IconButton>edit</IconButton>
          <AlertDialog icon='delete'
            className={classes.alignRight}
            title='Are you sure you want to delete this customer?'
            text='Caution: Deleting this customer will also delete any open tickets or interactions.'
            do={handleDelete} />
        </Box>
        <CustomerInfo customerInfo={customerData.customerInfo} />
        <Typography variant="h4" className={classes.title}>
          Interactions
          <Link to={`/customers/${customerId}/newInteraction`} style={{ textDecoration: 'none', minWidth: '100%' }}>
            <IconButton>add_circle</IconButton>
          </Link>
        </Typography>
        {customerData.interactions.length === 0 ? (
          <Fragment>
            <Typography variant="h4"
              color="textSecondary"
              align='center'>
            There is no interaction record
            </Typography>
          </Fragment>
        ) : (
          <InteractionList interactions = {customerData.interactions} />
        )}
      </Fragment>
    );
  } else {
    return null;
  }
}
