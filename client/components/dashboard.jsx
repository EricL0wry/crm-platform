import React, { Fragment, useContext, useEffect, useState } from 'react';
import AppContext from '../lib/context';
import TicketList from './ticket-list';
import Weather from './weather';
export default function Dashboard() {

  const context = useContext(AppContext);
  const userId = context.getUser().userId;
  const [myData, setMyData] = useState(null);
  useEffect(() => {
    fetch('/api/dashboard/' + userId)
      .then(response => response.json())
      .then(data => {
        setMyData(data);
      })
      .catch(error => console.log('Fetch failed!', error));
  }, []);

  if (myData !== null) {
    return (
      <Fragment>
        <Weather weather={myData.weather} userInfo={myData.userInfo} />
        <TicketList tickets={myData.ticketList} />
      </Fragment>
    );
  } else {
    return null;
  }

}
