import React, { useContext, useEffect, useState, Fragment } from 'react';
import AppContext from '../lib/context';
import CustomerList from './customer-list';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

export default function Customers() {
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
      <Typography variant="h4">
        My Customers
        <Link to="/customer/new">
          <IconButton>add_circle</IconButton>
        </Link>
      </Typography>
      <CustomerList customers={customerList} />
    </Fragment>
  );
}
