import React, { Fragment, useContext, useEffect } from 'react';
import AppContext from '../lib/context';
import MenuAppBar from './menu-app-bar';
import TicketList from './ticket-list';
import Weather from './weather';
export default function Dashboard() {

  const context = useContext(AppContext);
  const userId = context.getUser();
  let myData = '';
  useEffect(() => {
    fetch('/api/dashboard/' + userId)
      .then(response => response.json())
      .then(data => {
        myData = data;
        console.log(myData);
      })
      .catch(error => console.log('Fetch failed!', error));
  });

  return (
    <Fragment>
      <MenuAppBar />
      <Weather />
      <TicketList />
    </Fragment>
  );

}
