import React, { Fragment, useContext, useEffect, useState } from 'react';
import AppContext from '../lib/context';
import TicketList from './ticket-list';
import Weather from './weather';
import Typography from '@material-ui/core/Typography';
import Loading from './loading';
import Box from '@material-ui/core/Box';

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
        <Box pt={'8px'}>
          <Typography variant="h5"
            color="textSecondary"
            align='center'
          >
          Top 5 Tickets
          </Typography>
        </Box>
        {myData.ticketList.length === 0 ? (
          <Typography variant="h4"
            color="textSecondary"
            align = 'center'>
            There Is No Ticket
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
