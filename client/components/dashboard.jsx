import React, { Fragment, useContext, useEffect, useState } from 'react';
import AppContext from '../lib/context';
import TicketList from './ticket-list';
import Weather from './weather';
import Typography from '@material-ui/core/Typography';
import Loading from './loading';

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
      .catch(error => console.error('Fetch failed!', error));
  }, []);

  if (myData !== null) {
    return (
      <Fragment>
        <Weather weather={myData.weather} forcast={myData.weather_3days} userInfo={myData.userInfo} />
        <Typography variant="h5"
          color="textSecondary"
          align='center'>
          Top 5 tickets
        </Typography>
        {myData.ticketList.length === 0 ? (
          <Typography variant="h4"
            color="textSecondary"
            align = 'center'>
            There is no ticket
          </Typography>
        ) : (
          <TicketList tickets={myData.ticketList} />
        )}
      </Fragment>
    );
  } else {
    return <Loading />;
  }

}
