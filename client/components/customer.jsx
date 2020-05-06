import React, { useContext, useEffect, useState, Fragment } from 'react';
import AppContext from '../lib/context';
import CustomerList from './customer-list';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Icon';
import { Link, useParams } from 'react-router-dom';
import CustomerInfo from './customer-info';
import InteractionList from './interaction-list';

export default function Customer() {
  const [customerData, setCustomerData] = useState(null);
  const { customerId } = useParams();
  useEffect(() => {
    fetch('/api/customers/' + customerId)
      .then(response => response.json())
      .then(data => {
        setCustomerData(data);
      })
      .catch(error => console.error('Fetch failed!', error));
  }, []);

  if (customerData !== null) {
    return (
      <Fragment>
        <Typography variant="h4">
        Customer Info
          <IconButton>map</IconButton>
          <IconButton>edit</IconButton>
          <IconButton>delete</IconButton>
        </Typography>
        <CustomerInfo customerInfo={customerData.customerInfo} />
        {/* <InteractionList interaction={customerData.interactions} /> */}
      </Fragment>
    );
  } else {
    return null;
  }

}
