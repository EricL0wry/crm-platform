import React, { Fragment, useContext, useEffect, useState } from 'react';
import AppContext from '../lib/context';
import MenuAppBar from './menu-app-bar';

export default function Organization() {
  const context = useContext(AppContext);
  const userId = context.getUser().userId;
  const [customerData, setCustomerData] = useState(null);
  useEffect(() => {
    fetch(`/api/org/${userId}`)
      .then(response => response.json())
      .then(data => {
        setCustomerData(data);
        console.log(data);
      })
      .catch(error => console.error('unable to fetch customer data', error));
  }, []);

  return (
    <Fragment>
      <MenuAppBar />
    </Fragment>
  );
}
