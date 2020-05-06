import React, { Fragment, useContext, useEffect, useState } from 'react';
import AppContext from '../lib/context';
import MenuAppBar from './menu-app-bar';
import { Typography } from '@material-ui/core';
import OrganizationList from './organization-list';

export default function Organization() {
  const context = useContext(AppContext);
  const userId = context.getUser().userId;
  const [customerData, setCustomerData] = useState(null);
  useEffect(() => {
    fetch(`/api/org/${userId}`)
      .then(response => response.json())
      .then(data => {
        setCustomerData(data);
      })
      .catch(error => console.error('unable to fetch customer data', error));
  }, []);

  return (
    <Fragment>
      <MenuAppBar />
      <Typography variant="h4">
        Organization Members
      </Typography>
      <OrganizationList customerData={customerData}/>
    </Fragment>
  );
}
