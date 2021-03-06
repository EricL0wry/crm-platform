import React, { useEffect, useState, useContext, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Icon';
import { Link, useParams, useHistory } from 'react-router-dom';
import CustomerInfo from './customer-info';
import InteractionList from './interaction-list';
import AlertDialog from './alert-dialog';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import ApplicationContext from '../lib/context';
import MapDialog from './map-dialog';

const useStyles = makeStyles(theme => {
  return {
    icon: {
      color: theme.palette.primary.light
    },
    title: {
      margin: theme.spacing(1.5)
    },
    titleBottom: {
      margin: theme.spacing(1.5),
      marginBottom: theme.spacing(1)
    },
    noInteractions: {
      marginTop: theme.spacing(1.5)
    }
  };
});

export default function Customer() {
  const classes = useStyles();
  const [customerData, setCustomerData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const { customerId } = useParams();
  const history = useHistory();
  const context = useContext(ApplicationContext);

  useEffect(() => {
    getCustomers();
    getLocationData();
  }, []);

  const getCustomers = () => {
    fetch('/api/customers/' + customerId)
      .then(response => response.json())
      .then(data => {
        setCustomerData(data);
      })
      .catch(error => console.error('Fetch failed!', error));
  };

  const handleDelete = () => {
    fetch('/api/customers/' + customerId, {
      method: 'DELETE'
    }).then(response => {
      if (response.status === 204) {
        history.push('/customers');
        context.openSnackbar('Customer successfully deleted!');
      } else {
        context.openSnackbar('Customer successfully deleted!');
        throw new Error('Fetch failed!');
      }
    })
      .catch(error => console.error(error));
  };

  const getLocationData = () => {
    fetch('/api/location/' + customerId)
      .then(response => response.json())
      .then(data => {
        setLocationData(data);
      })
      .catch(error => console.error(error));
  };

  if (customerData !== null) {
    return (
      <Fragment>
        <Box display='flex' alignItems='center' className={classes.title}>
          <Box p={0} flexGrow={1}>
            <Typography variant="h4">
            Customer Info
            </Typography>
          </Box>
          <Box mr={1}>
            <MapDialog icon='map' locationData={locationData}/>
          </Box>
          <Box mr={1}>
            <Link to={`/customers/edit/${customerId}`}
              style={{ textDecoration: 'none', minWidth: '100%' }}>
              <IconButton className={classes.icon}>edit</IconButton>
            </Link>
          </Box>
          <Box mr={1}>
            <AlertDialog icon='delete'
              className={classes.alignRight}
              title='Are you sure you want to delete this customer?'
              text='Caution: Deleting this customer will also delete any open tickets or interactions.'
              do={handleDelete} />
          </Box>
        </Box>
        <CustomerInfo customerInfo={customerData.customerInfo} />

        <Box display='flex' alignItems='center' className={classes.titleBottom}>
          <Box p={0} flexGrow={1}>
            <Typography variant="h4">
          Interactions
            </Typography>
          </Box>
          <Box mr={1}>
            <Link to={`/customers/${customerId}/newInteraction`}
              style={{ textDecoration: 'none', minWidth: '100%' }}>
              <IconButton className={classes.icon}>add_circle</IconButton>
            </Link>
          </Box>
        </Box>
        {customerData.interactions.length === 0 ? (
          <Fragment>
            <Typography variant="h6"
              color="textSecondary"
              align='center'
              className={classes.noInteractions}>
            This customer does not have any recorded interactions.
            </Typography>
          </Fragment>
        ) : (
          <InteractionList interactions={customerData.interactions}
            customerId={customerId}
            getCustomers={getCustomers}/>
        )}

      </Fragment>
    );
  } else {
    return null;
  }
}
